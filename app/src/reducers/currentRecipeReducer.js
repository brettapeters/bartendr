import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.currentRecipe, action) {
  switch(action.type) {
    case types.FETCH_RECIPE_REQUEST:
      return null;
    case types.FETCH_RECIPE_SUCCESS:
      return action.recipe;
    case types.DELETE_RECIPE_SUCCESS:
      return null;
    default:
      return state;
  }
}
