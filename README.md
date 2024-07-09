Build a system to efficiently process image data from CSV files. 

The system will--:
 a.Receive CSV files containing image data.
 b. Validate the CSV data format.
 c. Asynchronously process images by compressing them by 50%.
 d. Store processed image data and associated product information in a database.
 e. Provide APIs for uploading CSV files, checking processing status

Tech Stack: Node.js
Database: MySQL
Asynchronous APIs:
Upload API: Accepts CSV files and returns a unique request ID.
Status API: Allows users to query processing status using the request ID.

Components Included--
1. Image Processing Service Interaction
2. Integrates with the async image processing service.

Database Interaction: 
Stores and tracks processing request statuses.
