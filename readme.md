# Simple Calendar Web App  

This is a **Simple Calendar Web Application** that allows users to manage events. Users can create, update, delete, and search for events using an intuitive interface. The app is built with a **MERN stack** (MongoDB, Express, React, Node.js) and follows a modular code structure.  

---  

## Demo Links  

- **API Documentation**: [Postman Documentation](https://documenter.getpostman.com/view/21366695/2sAYBUDXqF)  
- **Live Website**: [Simple Calendar Web App](https://simple-calender-frontend.onrender.com/)  

### Project Demo Video  

[![Watch the demo video](https://img.youtube.com/vi/V-WcLkclQYE/0.jpg)](https://youtu.be/V-WcLkclQYE)  

*Click the thumbnail above to watch the demo video on YouTube.*  

---  

## Features  

- **Event Management**: Users can add, view, edit, and delete events.  
- **Event Search**: Search events by title, description, or date with a user-friendly search functionality.  
- **Authentication**: Secure login and token-based authentication (JWT).  
- **Responsive Frontend**: A React-based frontend ensuring compatibility across devices.  
- **API Endpoints**: Well-defined RESTful APIs for event management and user authentication.  
- **Scalable Backend**: Built with Node.js and Express, integrated with MongoDB for database management.  

---  

## File Structure  

```  
├── api  
│   ├── config          # Contains database configuration and other setup files  
│   ├── controllers     # Handles business logic for API endpoints  
│   ├── middleware      # Middleware functions (e.g., authentication)  
│   ├── models          # Mongoose models for database schemas  
│   ├── routes          # API routes  
│   ├── utils           # Helper functions and utilities  
│   ├── node_modules    # Node.js dependencies  
│   ├── .env            # Environment variables (server)  
│   ├── app.js          # Server entry point  
│   ├── server.js       # Server configuration  
│   └── package.json    # Server dependencies and scripts  
├── client  
│   ├── public          # Public assets (HTML, images, etc.)  
│   ├── src             # React application source code  
│       ├── pages       # Pages for routing (e.g., Listing, Event Details)  
│       └── App.js      # Main React app entry point  
│   └── package.json    # Client dependencies and scripts  
├── .gitignore          # Ignored files and directories  
```  

---  

## Environment Variables  

The project uses the following environment variables. You will need to create a `.env` file in the **server root** directory and define these variables:  

- **MONGO_URI**: MongoDB connection string  
- **ACCESS_TOKEN_SECRET**: Secret key for generating access tokens  
- **REFRESH_TOKEN_SECRET**: Secret key for generating refresh tokens  
- **PORT**: Port on which the server will run  

---  

## Tech Stack  

### **Frontend**  
- **React**: For building the user interface  
- **Axios**: For making API requests  
- **React Router**: For routing and navigation  
- **CSS**: Styling the app  

### **Backend**  
- **Node.js**: For creating a scalable server  
- **Express.js**: For handling server-side logic and APIs  
- **MongoDB**: As the database  
- **JWT**: For user authentication  
- **Mongoose**: For MongoDB object modeling  
- **Bcryptjs**: For password encryption and decryption  

---  

## Setup Instructions  

### **1. Clone the Repository**  
```bash  
git clone <repository-url>  
cd <repository-name>  
```  

### **2. Setup the Server**  

1. Navigate to the `api` directory:  
   ```bash  
   cd api  
   ```  
2. Install server dependencies:  
   ```bash  
   npm install  
   ```  
3. Create a `.env` file in the root of the `api` folder and add the required environment variables (refer to the "Environment Variables" section above).  
4. Start the server:  
   ```bash  
   npm run dev  
   ```  

### **3. Setup the Client**  

1. Navigate to the `client` directory:  
   ```bash  
   cd client  
   ```  
2. Install client dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the React application:  
   ```bash  
   npm run dev  
   ```  

### **4. Access the Application**  

Once the server and client are running:  
- **Frontend**: Access the React app at [http://localhost:3000](http://localhost:3000).  
- **Backend**: API server runs at [http://localhost:5000](http://localhost:5000).  

---  