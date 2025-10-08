import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signUpService = async (userData) => {
  try {
    const newUser = await userRepository.create(userData);
    return newUser;
  } catch (error) {
    console.log('User service error: ', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    }
    if (
      error.name === 'MongooseError' &&
      (error.code === 11000 || error?.cause?.code === 11000)
    ) {
      throw new ValidationError(
        { error: ['A user with same email or username already exists'] },
        'A user with same email or username already exists'
      );
    }
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    console.log('User fetched by email: ', user);

    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: "User with this email doesn't exist",
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    // match the incoming password with hashed password
    const isPasswordValid = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordValid) {
      throw new ClientError({
        explanation: 'Invalid credential sent from the client',
        message: 'Incorrect password, please try again.',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    // creating JWT auth token
    const token = createJWT({ id: user._id, email: user.email });

    return {
      username: user.username,
      email: user.email,
      id: user._id,
      avatar: user.avatar,
      token
    };
  } catch (error) {
    console.log('User service error: ', error);
    throw error;
  }
};
