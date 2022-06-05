import {
  createUser,
  verifyOTP,
  generateOTP,
} from "../controllers/user";

var express = require('express');

const Routes = express.Router();

// post requests
Routes.post("/", createUser);
Routes.post("/generateOTP", generateOTP);

// get request
Routes.get("/:user_id/verifyOTP", verifyOTP);

export default Routes;
