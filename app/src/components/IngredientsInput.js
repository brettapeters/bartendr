import React from 'react';
import PropTypes from 'prop-types';

class IngredientsInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newIngredient: {
        name: '',
        amount: '',
        unit: ''
      }
    };

    this.fieldChanged = this.fieldChanged.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }

  fieldChanged(e) {
    const field = e.target.name;
    let ingredient = Object.assign({}, this.state.newIngredient);
    ingredient[field] = e.target.value;
    return this.setState({ newIngredient: ingredient });
  }

  addIngredient(e) {
    if (!this.isValidIngredient(this.state.newIngredient)) {
      return false;
    }

    e.preventDefault();
    let ingredient = Object.assign({}, this.state.newIngredient);
    ingredient.amount = parseFloat(ingredient.amount);

    this.props.updateIngredients([
      ...this.props.ingredients,
      ingredient
    ]);

    this.setState({
      newIngredient: {
        name: '',
        amount: '',
        unit: ''
      }
    });

    this.nameInput.focus();
  }

  isValidIngredient(ing) {
    return ing.name !== '' && ing.amount !== '' && ing.unit !== '';
  }

  deleteIngredient(e, i) {
    e.preventDefault();

    this.props.updateIngredients([
      ...this.props.ingredients.slice(0, i),
      ...this.props.ingredients.slice(i + 1)
    ]);
  }

  render() {
    return (
      <div>
        <label htmlFor="ingredients">Ingredients</label>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Amount</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
          {this.props.ingredients.map((ing, i) => (
            <tr key={Math.random()}>
              <td>
                <button
                  type="button"
                  className="btn bg-danger text-white"
                  onClick={e => { this.deleteIngredient(e, i); }}
                >
                  <strong>&times;</strong>
                </button>
              </td>
              <td>{ing.name}</td>
              <td>{ing.amount}</td>
              <td>{ing.unit}</td>
            </tr>
          ))}
            <tr>
              <td>
                <button
                  type="button"
                  onClick={this.addIngredient}
                  className="btn bg-success text-white"
                >
                  <strong>+</strong>
                </button>
              </td>
              <td>
                <input
                  type="text"
                  ref={input => { this.nameInput = input; }}
                  value={this.state.newIngredient.name}
                  className="form-control"
                  name="name"
                  onChange={this.fieldChanged}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={this.state.newIngredient.amount}
                  min="0"
                  className="form-control"
                  name="amount"
                  onChange={this.fieldChanged}
                />
              </td>
              <td>
                <input
                  value={this.state.newIngredient.unit}
                  className="form-control"
                  list="units"
                  name="unit"
                  onChange={this.fieldChanged}
                />
                <datalist id="units">
                  <option value="oz" />
                  <option value="tbsp" />
                  <option value="tsp" />
                  <option value="cl" />
                </datalist>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

IngredientsInput.propTypes = {
  updateIngredients: PropTypes.func.isRequired,
  ingredients: PropTypes.array
};

IngredientsInput.defaultProps = {
  ingredients: []
};

export default IngredientsInput;