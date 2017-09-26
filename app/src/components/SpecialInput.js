import React from 'react';
import PropTypes from 'prop-types';

class SpecialInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newSpecial: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addSpecial = this.addSpecial.bind(this);
  }

  handleChange(e) {
    this.setState({ newSpecial: e.target.value });
  }

  addSpecial(e) {
    if (this.state.newSpecial === '') {
      return false;
    }

    e.preventDefault();
    this.props.updateSpecial([
      ...this.props.special,
      this.state.newSpecial
    ]);

    this.setState({
      newSpecial: ''
    });
  }

  deleteSpecial(e, i) {
    e.preventDefault();

    this.props.updateSpecial([
      ...this.props.special.slice(0, i),
      ...this.props.special.slice(i + 1)
    ]);
  }

  render() {
    return (
      <div>
        <label htmlFor="special">Special</label>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {this.props.special.map((name, i) => (
            <tr key={Math.random()}>
              <td>
                <button
                  type="button"
                  className="btn bg-danger text-white"
                  onClick={e => { this.deleteSpecial(e, i); }}
                >
                  <strong>&times;</strong>
                </button>
              </td>
              <td>{name}</td>
            </tr>
          ))}
            <tr>
              <td>
                <button
                  type="button"
                  onClick={this.addSpecial}
                  className="btn bg-success text-white"
                >
                  <strong>+</strong>
                </button>
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.newSpecial}
                  className="form-control"
                  name="name"
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

SpecialInput.propTypes = {
  updateSpecial: PropTypes.func.isRequired,
  special: PropTypes.array
};

SpecialInput.defaultProps = {
  special: []
};

export default SpecialInput;