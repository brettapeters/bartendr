import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function(state = initialState.recipes, action) {
  switch(action.type) {
    case types.FETCH_RECIPES_SUCCESS:
      return action.recipes;
    default:
      return state;
  }
}