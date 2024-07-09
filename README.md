Build a system to efficiently process image data from CSV files. The system will:

Receive CSV files containing image data.
Validate the CSV data format.
Asynchronously process images by compressing them by 50%.
Store processed image data and associated product information in a database.
Provide APIs for uploading CSV files, checking processing status

Tech Stack: Node.js
Database: MySQL
Asynchronous APIs:
Upload API: Accepts CSV files and returns a unique request ID.
Status API: Allows users to query processing status using the request ID.

Components Included-----
Image Processing Service Interaction: Integrates with the async image processing service.

Database Interaction: Stores and tracks processing request statuses.
