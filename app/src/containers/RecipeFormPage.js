import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchRecipe, createRecipe, updateRecipe } from '../actions/recipeActions';
import { clearError } from '../actions/errorActions';
import toastr from 'toastr';
import ErrorPage from './ErrorPage';
import RecipeForm from '../components/RecipeForm';

class RecipeFormPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: Object.assign({}, props.recipe)
    };

    this.updateField = this.updateField.bind(this);
    this.updateIngredients = this.updateIngredients.bind(this);
    this.updateSpecial = this.updateSpecial.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.props.actions.fetchRecipe(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe.id != nextProps.recipe.id) {
      this.setState({ recipe: Object.assign({}, nextProps.recipe) });
    }
  }

  updateField(event) {
    const field = event.target.name;
    let recipe = Object.assign({}, this.state.recipe);
    recipe[field] = event.target.value;
    return this.setState({ recipe });
  }

  updateIngredients(ingredients) {
    let recipe = Object.assign({}, this.state.recipe, { ingredients });
    return this.setState({ recipe });
  }

  updateSpecial(special) {
    let recipe = Object.assign({}, this.state.recipe, { special });
    return this.setState({ recipe });
  }

  saveRecipe(event) {
    event.preventDefault();

    const { recipe } = this.state;
    const save = this.props.match.params.id ?
      this.props.actions.updateRecipe
    : this.props.actions.createRecipe;

    save(recipe);
  }

  render() {
    const { error } = this.props;
    if (error) {
      if (error.code === 404) {
        return <ErrorPage error={this.props.error} />;
      }
      toastr.error(error.error);
      this.props.actions.clearError();
    }
    return (
      <RecipeForm
        fieldChanged={this.updateField}
        updateIngredients={this.updateIngredients}
        updateSpecial={this.updateSpecial}
        onSave={this.saveRecipe}
        recipe={this.state.recipe}
      />
    );
  }
}

RecipeFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object,
  error: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const initialRecipe = {
    name: '',
    glass: '',
    category: '',
    ingredients: [],
    special: [],
    garnish: '',
    preparation: ''
  };
  return {
    recipe: ownProps.match.params.id && state.recipes[0] || initialRecipe,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  { actions: bindActionCreators({
    fetchRecipe,
    createRecipe,
    updateRecipe,
    clearError
  }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFormPage);