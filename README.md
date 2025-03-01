# MERN Stack Todo List App

This Todo List application is built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It is designed to help users effectively manage their daily tasks, with added functionalities for prioritizing tasks.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)  
- **MongoDB** (Ensure the service is running)  
- **MongoDB Compass** (Optional, for database management)  

## Setup Instructions

### 1. Clone the Repository  
Clone the project to your local environment:  

git clone https://github.com/hsalunkhe14/mern-todo-app.git


### 2. Install Dependencies  
Split the terminal and install dependencies for both backend and frontend:

Install backend dependencies

cd todo_backend npm install

Install frontend dependencies

cd ../todo_frontend npm install


### 3. MongoDB Setup  
- Open **MongoDB Compass**  
- Create a new database named **`Todo`**  
- Inside the `Todo` database, create a collection named **`tasks`**  

### 4. Configure Server for Database Connection  
Create a `.env` file inside the `todo_backend` directory and add the following variables:

PORT=5000 MONGO_URI=mongodb://127.0.0.1:27017/Todo


### 5. Running the Application  
Start both the backend and frontend servers:

Start the backend server (from 'todo_backend' directory)

npm start

Start the frontend client (from 'todo_frontend' directory)

npm start


The server will run on **`http://localhost:5000`** and the client on **`http://localhost:3000`**.

## Usage  

- Open your web browser and navigate to **`http://localhost:3000`**.  
- You can **add, update, mark tasks as completed, or delete them**.  

## License  

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---  
Happy coding! 🚀  
