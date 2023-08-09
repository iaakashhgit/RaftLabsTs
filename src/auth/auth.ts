import jwt from 'jsonwebtoken';

const accessToken = {
  generateAccessToken(email: string) {
    const payload = {
      email
    };

    console.log("payload==", payload, "process.env.SECRET_TOKEN", process.env.SECRET_TOKEN);
    return jwt.sign(payload, process.env.SECRET_TOKEN!, { expiresIn: '1000h' });
  }
};

export default accessToken;
