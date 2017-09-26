import { combineReducers } from 'redux';
import asyncRequests from './asyncRequestReducer';
import error from './errorReducer';
import currentUser from './currentUserReducer';
import recipes from './recipesReducer';
import currentRecipe from './currentRecipeReducer';

const rootReducer = combineReducers({
  asyncRequests,
  error,
  currentUser,
  recipes,
  currentRecipe
});

export default rootReducer;