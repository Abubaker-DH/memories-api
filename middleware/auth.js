import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  let decodedData;
  try {
    // get the token from header in auth[] after the " "
    const token = req.headers.Authorization.split(" ")[1];

    const isCoustomAuth = token.lenght < 500;

    if (token && isCoustomAuth) {
      // with our token
      decodedData = jwt.verify(token, process.env.JWT_SECTIR);
      req.userId = decodedData?.id;
    } else {
      // with google token
      decodedData = jwt.decode(token);
      // sud is what google use to differentiate every google user
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
