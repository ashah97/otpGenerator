
import User from "../models/user";
const { Op } = require("sequelize");

import { Request, Response } from "express";

import {
  errorResponse,
  generateOTPDto,
  generateOTPResponse,
} from "../dto/user";
import { ValidationError } from "sequelize";
import moment from "moment";


export const createUser = async (req: Request<User>, res: Response<User | errorResponse>) => {
  var userCreated;
  try {
    userCreated = await User.create(req.body);
    if (!userCreated) {
      res.json({ status: 400, message: "unable to create User" });
    } else {
      res.status(200).json(userCreated);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ status: 400, message: "User Already Exists" });
    } else {
      res.status(500).json({ status: error.status, message: error });
    }
  };
}

export const generateOTP = async (
  req: Request<generateOTPDto>,
  res: Response<generateOTPResponse | errorResponse>
) => {
  const user = await User.findOne({
    where: { phone_number: req.body.phone_number },
  });
  if (!user) {
    res.json({
      status: 404,
      message: "user does not exist",
    });
  } else {
    var otp = Math.floor(1000 + Math.random() * 9000);
    const dateToExpire = moment().add('5','minutes').toDate();
    const updateOTP = await User.update(
      { otp: otp, otp_expiration_date: dateToExpire },
      { where: { id: user.getDataValue("id") }, returning: true }
    );

    if (!updateOTP) {
      res.json({
        status: 400,
        message: "unable to update OTP",
      });
    } else {
      res.status(200).json({ id: user.getDataValue("id") });
    }
  }
};

export const verifyOTP = async (req: Request, res: Response<User | errorResponse>) => {
  const user = await User.findOne({
    where: {
      id: req.params.user_id,
    },
  });
  if (!user) {
    res.json({
      status: 404,
      message:"user does not exist",
    });
  } else {
    if (user.getDataValue('otp') != req.query.otp) {
    res.json({
        status: 400,
       message:"wrong otp provided",
      });
    }
    else if (user.getDataValue('otp_expiration_date') < moment().toDate()) {
    res.json({
        status: 404,
        message:"otp is expired",
      });
    }
    else {
    res.status(200).json(user);
    }
  }
};


