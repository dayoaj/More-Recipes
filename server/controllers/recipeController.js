import { Recipe } from '../server/models';
import Upvote from '../server/models/upvote';


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
