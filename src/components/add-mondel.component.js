import React, { Component } from "react";
import { connect } from "react-redux";
import { createMondel } from "../actions/mondels";
class AddMondel extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.saveMondel = this.saveMondel.bind(this);
    this.newMondel = this.newMondel.bind(this);
    this.state = {
      id: null,
      name: "",
      age: "",
      food: "",
      submitted: false,
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }
  onChangeFood(e) {
    this.setState({
      food: e.target.value,
    });
  }
  saveMondel() {
    const { name, age, food } = this.state;
    this.props
      .createMondel(name, age, food )
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          age: data.age,
          food: data.food,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newMondel() {
    this.setState({
      id: null,
      name: "",
      age: "",
      food: "",
      submitted: false,
    });
  }
  render() {
    return (
        <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMondel}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="food">food</label>
              <input
                type="text"
                className="form-control"
                id="food"
                required
                value={this.state.food}
                onChange={this.onChangeFood}
                name="food"
              />
            </div>
            <button onClick={this.saveMondel} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { createMondel })(AddMondel);