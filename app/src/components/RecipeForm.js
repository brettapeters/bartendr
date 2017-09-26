import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import TextareaInput from './TextareaInput';
import IngredientsInput from './IngredientsInput';
import SpecialInput from './SpecialInput';

const RecipeForm = ({ fieldChanged, updateIngredients, updateSpecial, onSave, recipe }) => (
  <div className="container">
    <div className="py-4">
      <h1 className="display-4">{recipe.id ? 'Edit' : 'New'} Recipe</h1>
      <hr />
    </div>
    <form className="form-group col-md-8" onSubmit={onSave}>
      <TextInput
        label="Name"
        name="name"
        value={recipe.name}
        onChange={fieldChanged}
      />

      <TextInput
        label="Category"
        help="e.g. highball, sour, spirit-forward, tropical"
        name="category"
        value={recipe.category}
        onChange={fieldChanged}
      />

      <TextInput
        label="Glass"
        help="What kind of glass is it served in?"
        name="glass"
        value={recipe.glass || ''}
        onChange={fieldChanged}
      />

      <IngredientsInput ingredients={recipe.ingredients} updateIngredients={updateIngredients} />

      <SpecialInput special={recipe.special} updateSpecial={updateSpecial} />

      <TextInput
        label="Garnish"
        name="garnish"
        value={recipe.garnish || ''}
        onChange={fieldChanged}
      />

      <TextInput
        label="Photo URL"
        help="Paste in a link to an image"
        name="photoURL"
        value={recipe.photoURL}
        onChange={fieldChanged}
      />

      <TextareaInput
        label="Preparation"
        name="preparation"
        value={recipe.preparation}
        onChange={fieldChanged}
      />

      <input className="btn btn-primary" type="submit" value="Save" />
    </form>
  </div>
);

RecipeForm.propTypes = {
  fieldChanged: PropTypes.func.isRequired,
  updateIngredients: PropTypes.func.isRequired,
  updateSpecial: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

export default RecipeForm;