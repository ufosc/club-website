import {Request} from 'express';
import jwt_decode from 'jwt-decode';

export const getDecodedJwt = (req: Request) => {
	if (req.headers['authorization'])
		return jwt_decode((<string>req.headers['authorization']));
	return null;
};

export const isValid = (decoded: any) => {
	const currentTime = Date.now() / 1000; // to get in milliseconds
	return decoded && decoded.exp > currentTime;
};
