const server = require("express")();
const cookieParser = require('cookie-parser');
const app = require("./src/app");
const db = require("./src/config/db");
const { sendResponse } = require("./src/utils/helper");
require('dotenv').config();

// Enable cookie parsing
server.use(cookieParser());

server.use(app);

// PAGE NOT FOUND
server.use((_req, res) => {
  console.error('Error:PAGE NOT FOUND');
  return sendResponse(res, 400, 'PAGE NOT FOUND');
});

const PORT = process.env.PORT || 3000;

// Start the connection
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});