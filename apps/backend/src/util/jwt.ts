import jwt from "jsonwebtoken";

type JwtType = "access" | "refresh";

export const generateJwt = (uuid: string, type: JwtType): string => {
  let expiryDate = 0;
  if (type === "access") {
    expiryDate = Math.floor(new Date().getTime() + (5 * 60 * 1000) / 1000);
  } else {
    expiryDate = Math.floor(
      new Date().getTime() + (14 * 24 * 60 * 60 * 1000) / 1000
    );
  }

  return jwt.sign(
    {
      uuid,
      type,
    },
    "goodsecret",
    {
      expiresIn: expiryDate,
    }
  );
};

export const verifyJwt = (token: string): string | undefined => {
  try {
    const verified = jwt.verify(token, 'goodsecret');
    //TODO: Return uuid;
    return 'allgood';
  } catch (err) {
    return undefined;
  }
};
