import 'dotenv/config';

import { expressjwt as expressJwt } from 'express-jwt';

const verifyUser = expressJwt({
  secret: process.env.JWT_SECRET || "hello",
  userProperty: 'auth',
  algorithms: ['HS256'],
});

export default verifyUser;
