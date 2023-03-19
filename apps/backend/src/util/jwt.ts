import jwt from "jsonwebtoken";

type JwtType = "access" | "refresh";
type Token = {
  type: JwtType,
  uuid: string,
  exp: number,
}

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

export const verifyJwt = (token: string): Token | undefined => {
  try {
    const verified = jwt.verify(token, 'goodsecret') as Token;
    //TODO: Return uuid;
    return verified;
  } catch (err) {
    return undefined;
  }
};
