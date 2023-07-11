const server = require("express")();
const app = require("./src/app");
const db = require("./src/config/db")
const cors =require("cors");
const { sendResponse } = require("./src/utils/helper");
require('dotenv').config();

// Enable CORS
server.use(cors());
server.use(app);
server.use((req,res)=>{
  sendResponse(res,400,req.query+" PAGE NOT FOUND")
})

const PORT = process.env.PORT || 3000;

// Start the database connection
db.connect()
  .then(() => {
    console.log('Connected to the PostgreSQL database'); 
    // Start the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the PostgreSQL database:', error.toString());
    process.exit(1);
  });
