const jwt = require('jsonwebtoken');

exports.callbackAppleAuth = (req: any, res: any) => {
  const token = req.query.id_token;
  const decoded = jwt.decode(token);

  res.send(
    '<h1>Wellcome Back</h1>' +
      '<h3>Appleから渡される値</h3>' +
      '<pre style="border:1px solid gray;">' +
      JSON.stringify(req.query, null, 4) +
      '</pre>' +
      '<h3>id_tokenをデコード</h3>' +
      '<pre style="border:1px solid gray;">' +
      JSON.stringify(decoded, null, 4) +
      '</pre>'
  );
};
