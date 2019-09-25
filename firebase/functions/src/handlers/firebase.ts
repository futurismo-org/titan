import admin from '../utils/admin';

exports.createToken = (req: any, res: any) => {
  const token = req.body.token;
  return admin
    .auth()
    .createCustomToken(token)
    .then((token: string) => res.status(200).json(token))
    .catch((err: any) => {
      console.log(err);
      return res.status(500).json(err);
    });
};
