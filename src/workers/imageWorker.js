const axios = require('axios');
const sharp = require('sharp');
const { Request, Product } = require('../models/database');
const fs = require('fs');
const path = require('path');

const downloadImage = async (url, filepath) => {
    const response = await axios({ url, responseType: 'stream' });
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

const processImage = async (inputPath, outputPath) => {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    await image.resize({ width: Math.floor(metadata.width * 0.5) }).toFile(outputPath);
};

exports.processImages = async (requestId, products) => {
    const requests = products.map(async (product) => {
        const inputUrls = product.inputImageUrls.split(',');
        const outputUrls = [];

        for (const url of inputUrls) {
            const filename = path.basename(url);
            const inputPath = path.resolve(__dirname, `../../uploads/original/${filename}`);
            const outputPath = path.resolve(__dirname, `../../uploads/processed/output-${filename}`);

            try {
                await downloadImage(url, inputPath);
                await processImage(inputPath, outputPath);
                outputUrls.push(outputPath); // You may change this to a public URL if needed
            } catch (error) {
                console.error('Error processing image:', error);
            }
        }

        await Product.update(
            { outputImageUrls: outputUrls.join(',') },
            { where: { productName: product.productName, requestId: requestId } }
        );
    });

    await Promise.all(requests);

    await Request.update({ status: 'COMPLETED' }, { where: { id: requestId } });

};
