import express from 'express';

const router = express.Router();

let recipeIdAllocator = 1;

global.recipes = [
  {
    id: 1,
    title: 'Jollof Rice',
    upvotes: 3,
    reviews: ['Very Good', 'I love this recipe'],

  }
];

// Handles route to get all recipe
router.get('/recipes', (req, res) => {
  res.json({
    recipes: global.recipes,
    error: false
  });
});

// Handles route to add a new recipe
router.post('/recipes', (req, res) => {
  if (!req.body.title) {
    return res.json({
      message: 'Recipe title missing',
      error: true
    });
  }

  // Adds id to request
  recipeIdAllocator += 1;
  req.body.id = (recipeIdAllocator);

  // push request to array body
  global.recipes.push(req.body);
  return res.json({
    message: `Success, Recipe id = ${recipeIdAllocator}`,
    error: false
  });
});

//
router.put('/recipes/:recipeid', (req, res) => {
  let found = false;
  found = global.recipes.some((recipe) => {
    if (recipe.id === parseInt(req.params.recipeid, 10)) {
      recipe.title = req.body.title;
      recipe.upvotes = req.body.upvotes;
      recipe.reviews = req.body.reviews;
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


export default router;
