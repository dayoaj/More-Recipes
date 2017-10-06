import jwt from 'jsonwebtoken';
import config from '../config';
/**
 *
 *
 * @export
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} Response
 */
export default function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.encryptPassword, (err, decoded) => {
    if (err) {
      return res.status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // Save parameter to use in next call
    req.username = decoded.username;

    // proceed if no error is present
    next();
  });
}
