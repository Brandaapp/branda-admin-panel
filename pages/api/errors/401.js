/**
 * Publically accessible error route used to redirect to generic API authentication.
 * This won't be shown in rendered pages due to error catching.
 */
export default (_req, res) => {
  return new Promise(resolve => {
    res.status(401).send('Correct `api_token` should be specified in request header');
    resolve();
  });
};
