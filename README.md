# How to Run the Backend

## Prerequisites
Ensure you have Node.js and npm installed on your system.

## Steps to Run the Backend

1. **Install Dependencies**
   - Navigate to the backend directory and install the required dependencies:
     ```bash
     npm install
     ```

2. **Configure Environment Variables**
   - Create a `.env` file in the backend directory if it doesn't exist.
   - Add the necessary environment variables, such as:
     ```
     PORT=3000
     MONGO_URI=<your-mongodb-uri>
     ```

3. **Run the Backend**
   - For development (with live reloading):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

4. **Verify the Backend**
   - The backend server should now be running. By default, it will be available at:
     ```
     http://localhost:3000
     ```

> **Note**: Ensure that the MongoDB database is accessible, and any required environment variables are properly configured.
