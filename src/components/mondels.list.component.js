import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { retrieveMondels, findMondelsByName, deleteAllMondels } from "../actions/mondels";


class MondelsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveMondel = this.setActiveMondel.bind(this);
    this.removeAllMondels = this.removeAllMondels.bind(this);

    this.state = {
      currentMondel: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.props.retrieveMondels();
  }

  refreshData() {
    this.setState({
      currentMondel: null,
      currentIndex: -1,
    });
  }

  setActiveMondel(mondel, index) {
    this.setState({
      currentMondel: mondel,
      currentIndex: index,
    });
  }

  removeAllMondels() {
    this.props
      .deleteAllMondels()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentMondel, currentIndex } = this.state;
    const { mondels } = this.props;

    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
            </div>
          </div>
          <div className="col-md-6">
            <h4>Mondels List</h4>
  
            <ul className="list-group">
              {mondels &&
                mondels.map((mondel, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveMondel(mondel, index)}
                    key={index}
                  >
                    {mondel.name}
                  </li>
                ))}
            </ul>
  
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllMondels}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentMondel ? (
              <div>
                <h4>Mondel</h4>
                <div>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentMondel.name}
                </div>
                <div>
                  <label>
                    <strong>Age:</strong>
                  </label>{" "}
                  {currentMondel.age}
                </div>
                <div>
                  <label>
                    <strong>Food:</strong>
                  </label>{" "}
                  {currentMondel.food}
                </div>
  
                <Link
                  to={"/mondels/" + currentMondel.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Select a Mondel from the Left</p>
              </div>
            )}
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    mondels: state.mondels,
  };
};

export default connect(mapStateToProps, { 
    retrieveMondels,
    findMondelsByName, 
    deleteAllMondels })(MondelsList);