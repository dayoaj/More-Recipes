import Validator from 'validatorjs';
import { Recipe, Upvote, User } from '../server/models';
// Rus to vaildate new recipes
const addNewRecipeRules = {
  title: 'required|between:2,40',
  ingredient: 'required|between:2,40',
  instructions: 'required|between:2,40',
};


const recipeController = {

  /**
   *
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {Object} Response object
   */
  list(req, res) {
    return Recipe
      .all()
      .then(recipe => res.status(200).send(recipe))
      .catch(error => res.status(400).send(error));
  },
  addNew(req, res) {
    const reqParam = req.body;
    const validator = new Validator(reqParam, addNewRecipeRules);
    if (validator.passes()) {
      User.findOne({ where: { username: req.body.username } }).then((user) => {
        Recipe.create({
          title: req.body.title,
          ingredient: req.body.ingredient,
          instructions: req.body.instructions,
          userId: user.id
        }).catch(res.send({ message: 'Unable to enter recipe' }));
      });
      return res.status(200).send({ message: 'Recipe entry Successful!' });
    }
  },
  getUpvote(req, res) {
    Recipe.findAll({
      include: [{
        model: Upvote,
        where: { flag: true }
      }]
    }).then(recipe => res.status(200).send(recipe));
  }
};

export default recipeController;
