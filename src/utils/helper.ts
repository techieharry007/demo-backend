// import {genSalt, hash, compareSync } from "bcrypt-ts";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const saltRounds = 10;
export const generatePassword = async (password: string): Promise<string> => {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error('Error hashing password:', error);
      return '';
    }
  };

export const comparePassword=async(password:string,hash:string)=>{
    // false
    let isAuthenticated=false
    isAuthenticated=await bcrypt.compare(password, hash)
    return isAuthenticated
  
}

const SECRET_KEY = process.env.JWT_SECRET // Use an environment variable for security
const EXPIRES_IN=process.env.JWT_EXPIRES_IN
// console.log("EXPIRES_INEXPIRES_IN",EXPIRES_IN)
export const generateJWTToken = (payload:string): string => {
 return jwt.sign(payload,SECRET_KEY)
};

