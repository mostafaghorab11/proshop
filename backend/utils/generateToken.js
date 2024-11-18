import jwt from 'jsonwebtoken';

const generateToken = (id, res) => {
  const accessToken = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // set jwt as HTTP-only cookie
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return accessToken;
};

export default generateToken;
