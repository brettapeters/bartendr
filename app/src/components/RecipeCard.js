import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
 
const RecipeCard = ({ id, ingredients, name, special, photoURL }) => (
  <div className="col-6 col-lg-4">
    <h2>{name}</h2>
    {photoURL && 
      <Link to={`/recipes/${id}`}>
        <img src={photoURL} alt={name} className="img-fluid rounded mb-2" />
      </Link>
    }
    <ul>
      {ingredients.map(ing => (
        <li key={ing.name} className="text-muted">{ing.name}</li>
      ))}
    </ul>
    <p>
      <Link to={`/recipes/${id}`} className="btn btn-secondary">View details &raquo;</Link>
    </p>
  </div>
);

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string,
  special: PropTypes.array
};

RecipeCard.defaultProps = {
  special: []
};

export default RecipeCard;