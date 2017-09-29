import express from 'express';

const router = express.Router();

global.recipes = [
  {
    recipeId: 1,
    title: 'Jollof Rice',
    upvotes: 3,
    reviews: ['Very Good', 'I love this recipe'],

  }
];

router.get('/recipes', (req, res) => {
  res.json({
    recipes: global.recipes,
    error: false
  });
});

router.post('/recipes', (req, res) => {
  if (!req.body.title) {
    return res.json({
      message: 'Recipe title missing',
      error: true
    });
  }
  global.recipes.push(req.body);
  return res.json({
    message: 'Success',
    error: false
  });
});

router.put('/recipes/:recipeid', (req, res) => {
  global.recipes.forEach((recipe) => {
    if (recipe.id === parseInt(req.params.recipeId, 10)) {
      recipe.title = req.body.title;
      recipe.upvotes = req.body.upvotes;
      recipe.reviews = req.body.reviews;
      return res.json({
        message: 'Success',
        error: false
      });
    }
  });
  return res.status(404).json({
    message: 'user not found',
    error: true
  });
});

export default router;
