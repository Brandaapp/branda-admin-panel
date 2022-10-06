/**
 * Publically accessible error route used to redirect to generic internal server error.
 * This won't be shown in rendered pages due to error catching.
 */
export default (_req, res) => {
  return new Promise(resolve => {
    res.status(500).send('Internal server error (likely connecting to database)');
    resolve();
  });
};
