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
  phone: 'required|between:3,21'
};

// Rules for validating user sign in
const signInRules = {
  username: 'required|between:2,40',
  password: 'required|between:4,40'
};


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
        const token = jwt.sign({ username: user.username }, config.encryptPassword, {
          expiresIn: 1440 // expires in 1 hour
        });
        res.send({ message: 'Sign up successful', token });
      }).catch(err => res.status(500).send(err));
    }
    // return res.status(400).send('Request not properly structured');
  },

  signIn(req, res) {
    const reqParam = req.body;

    // Initialize Validator
    const validator = new Validator(reqParam, signInRules);

    // Checks if Validation passes and then execute
    if (validator.passes()) {
      User.findOne({ where: { username: req.body.username } })
        .then((user) => {
          const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          if (!passwordIsValid) return res.status(401).send({ message: 'Password invalid', token: null });
          const token = jwt.sign({ username: user.username }, config.encryptPassword, {
            expiresIn: 1440 // expires in 1 hour
          });
          return res.status(200)
            .send({ message: 'Log in Successful', token });
        })
        .catch(err => res.status(500).send(`There was a problem finding the user. ${err}`));
    }
    return validator.errors.get();
  }

};

export default userController;
