import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import * as actions from '../actions/recipeActions';
import ErrorPage from '../containers/ErrorPage';
import RecipeSidebar from '../components/RecipeSidebar';
import ScrollToTop from '../components/ScrollToTop';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.fetchRecipe(this.props.match.params.id);
    this.props.actions.fetchRecipes();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.props.actions.fetchRecipe(nextProps.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  onClickDelete(e) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      this.props.actions.deleteRecipe(this.props.currentRecipe.id);
    }
  }

  render() {
    if (this.props.error) {
      return <ErrorPage error={this.props.error} />;
    }

    const {
      name,
      created,
      glass,
      category,
      ingredients,
      garnish,
      special,
      preparation,
      rating,
      user,
      photoURL
    } = this.props.currentRecipe;

    const canEdit = this.props.currentUser &&
                    this.props.currentUser.id !== "" &&
                    this.props.currentUser.id === user.id;

    return (
      <div className="container">
        <div className="row row-offcanvas row-offcanvas-right">
          <div className="col-12 col-md-9">
            <div className="row py-4">
              <div className="col-sm-8">
                <h1 className="display-4">{name}</h1>
                {category && <p className="lead text-muted">Category: {category}</p>}
                <p className="text-muted">
                  <small>{`${new Date(created).toLocaleString()} | ${user.name}`}</small>
                </p>
              </div>
              {canEdit &&
                <div className="my-auto ml-3">
                  <Link
                    to={`/recipes/${this.props.match.params.id}/edit`}
                    className="btn btn-sm bg-primary text-white mr-1"
                  >
                    Edit
                  </Link>
                  <a
                    href=""
                    className="btn btn-sm bg-danger text-white"
                    onClick={this.onClickDelete}
                  >
                    Delete
                  </a>
                </div>
              }
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6 mb-2">
                <img
                  className="img-fluid rounded float-left"
                  src={photoURL}
                  alt="cocktail"
                />
              </div>
              <div className="col-md-6 col-lg-4">
                <h3>Ingredients</h3>
                <ul className="list-group pb-2">
                {ingredients.map(ing => (
                  <li
                    key={ing.name}
                    className="list-group-item"
                  >
                    {`${ing.amount} ${ing.unit} ${ing.name}`}
                  </li>
                ))}
                </ul>
                {special && 
                  <div className="pb-2">
                    <h3>Special</h3>
                    <ul className="list-group">
                    {special.map(s => <li key={s} className="list-group-item">{s}</li>)}
                    </ul>
                  </div>
                }
                {garnish && 
                  <div className="pb-2">
                    <h3>Garnish</h3>
                    <div className="list-group-item">{garnish}</div>
                  </div>
                }
                {glass && 
                  <div className="pb-2">
                    <h3>Glass</h3>
                    <div className="list-group-item">{glass}</div>
                  </div>
                }
              </div>
            </div>
            <hr />
            <div className="row py-2">
              <h3 className="col-md-12">Preparation</h3>
              <p className="col-md-9">{preparation}</p>
            </div>
          </div>
          <RecipeSidebar recipes={this.props.recipes.slice(0, 20)} />
        </div>
        <hr />
        <footer>
          <p>&copy; Bartendr 2017</p>
        </footer>
      </div>
    );
  }
}

RecipePage.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  currentRecipe: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  recipes: PropTypes.array,
  error: PropTypes.object
};

const mapStateToProps = state => {
  const initialRecipe = {
    id: '',
    created: '',
    name: '',
    glass: '',
    category: '',
    ingredients: [],
    special: [],
    garnish: '',
    preparation: '',
    rating: 0,
    user: {}
  };
  return{
    recipes: state.recipes,
    currentRecipe: state.currentRecipe || initialRecipe,
    currentUser: state.currentUser,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);