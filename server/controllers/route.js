import express from 'express';
import recipe from './recipeController';
import user from './userController';
import VerifyToken from '../Middleware/verifyToken';


const router = express.Router();


// Handles route to get all recipe
router.get('/recipes', recipe.list);

// Handles route to sign up
router.post('/users/signup', user.createUser);

// Handles route to sign in
router.post('/users/signin', user.signIn);


// Handles route to add a new recipe
router.post('/recipes', VerifyToken, recipe.addNew);

//
router.put('/recipes/:recipeid', (req, res) => {
  // let found = false;
  // found = global.recipes.some((recipe) => {
  //   if (recipe.id === parseInt(req.params.recipeid, 10)) {
  //     recipe.title = req.body.title;
  //     recipe.upvotes = req.body.upvotes;
  //     recipe.reviews = req.body.reviews;
  //   }
  //   return recipe.id === parseInt(req.params.recipeid, 10);
  // });
  // if (found) {
  //   return res.json({
  //     message: 'Success',
  //     error: false
  //   });
  // }
  // return res.status(404).json({
  //   message: 'user not found',
  //   error: true
  // });
});

// Delete particular recipes
router.delete('/recipes/:recipeid', (req, res) => {
  let found = false;
  found = global.recipes.some((recipe, i, a) => {
    if (recipe.id === parseInt(req.params.recipeid, 10)) {
      a.splice(i, 1);
    }
    return recipe.id === parseInt(req.params.recipeid, 10);
  });
  if (found) {
    return res.json({
      message: 'Success',
      error: false
    });
  }
  return res.status(404).json({
    message: 'user not found',
    error: true
  });
});

// Add new Reviews
router.post('/recipes/:recipeid/reviews', (req, res) => {
  let found = false;
  found = global.recipes.some((recipe) => {
    if (recipe.id === parseInt(req.params.recipeid, 10)) {
      recipe.reviews.push(req.body.reviews);
    }
    return recipe.id === parseInt(req.params.recipeid, 10);
  });
  if (found) {
    return res.json({
      message: 'Success',
      error: false
    });
  }
  return res.status(404).json({
    message: 'user not found',
    error: true
  });
});

router.get('recipes?sort=upvotes&order=des', (req, res) => {
  // const sortVariable = req.query.sort;
  // const orderVariable = req.query.order;
  const sorted = global.recipes;

  sorted.sort((a, b) => {
    const varA = a.upvotes;
    const varB = b.upvotes;

    // if (orderVariable === 'asc') {
    //   if (varA < varB) { return -1; }
    //   if (varA > varB) { return 1; }
    //   return 0;
    // }

    // if (orderVariable === 'des') {
    if (varA < varB) { return 1; }
    if (varA > varB) { return -1; }
    return 0;
    // }
  });
  res.json({
    recipes: sorted,
    error: false
  });
});


export default router;
