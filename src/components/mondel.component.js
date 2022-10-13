import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMondel, deleteMondel } from "../actions/mondels";
import MondelDataService from "../services/mondel.service";

class Mondel extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeFood = this.onChangeFood.bind(this);
    this.getMondel = this.getMondel.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeMondel = this.removeMondel.bind(this);

    this.state = {
      currentMondel: {
        id: null,
        name: "",
        age: "",
        food: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getMondel(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentMondel: {
          ...prevState.currentMondel,
          name: name,
        },
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;

    this.setState((prevState) => ({
      currentMondel: {
        ...prevState.currentMondel,
        age: age,
      },
    }));
  }
  onChangeFood(e) {
    const food = e.target.value;

    this.setState((prevState) => ({
      currentMondel: {
        ...prevState.currentMondel,
        food: food,
      },
    }));
  }

  getMondel(id) {
    MondelDataService.get(id)
      .then((response) => {
        this.setState({
          currentMondel: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentMondel.id,
      name: this.state.currentMondel.name,
      age: this.state.currentMondel.age,
      food: this.state.currentMondel.food,
    };

    this.props
      .updateMondel(this.state.currentMondel.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateMondel(this.state.currentMondel.id, this.state.currentMondel)
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "The mondel was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeMondel() {
    this.props
      .deleteMondel(this.state.currentMondel.id)
      .then(() => {
        this.props.history.push("/mondels");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMondel } = this.state;

    return (
      <div>
        {currentMondel ? (
          <div className="edit-form">
            <h4>Mondel</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentMondel.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentMondel.age}
                  onChange={this.onChangeAge}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Food">Food</label>
                <input
                  type="text"
                  className="form-control"
                  id="food"
                  value={currentMondel.food}
                  onChange={this.onChangeFood}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeMondel}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Mondel...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateMondel, deleteMondel })(Mondel);