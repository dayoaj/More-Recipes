import Validator from 'validatorjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import { User } from '../server/models';

// Rules for validating User sign up
const createUserRules = {
  username: 'required|between:2,40',
  email: 'required|email',
  password: 'required|between:4,40',
  phone: 'integer'
};

// Rules for validating user sign in
// const getUserRules = {
//   username: 'required|between:2,40',
//   password: 'required|between:4,40'
// };


const userController = {

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Response Object
   */
  createUser(req, res) {
    const reqParam = req.body;
    const validator = new Validator(reqParam, createUserRules);
    if (validator.passes()) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone
      }).then((user) => {
        // jwt token
        const token = jwt.sign({ id: user.id }, config.encryptPassword, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ message: 'Sign up successful', token });
      });
    }
    return validator.errors.get('email');
  },

  getUser(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.encryptPassword, (err, decoded) => {
      if (err) {
        return res.status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      }
      res.status(200).send(decoded);
      // const reqParam = req.body;
      // const validator = new Validator(reqParam, getUserRules);
      // if (validator.passes()) {
      // User.findById(decoded.id)
      //   .then(user => res.status(200).send(user))
      //   .catch(err => res.status(500).send(`There was a problem finding the user. Error${err}`));
      // }
      // return validator.errors.get();
    });
  }

};

export default userController;
