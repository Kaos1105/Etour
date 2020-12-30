import React, { Component } from "react";
import Table from "../components/tour/table";

import { Store, Dispatcher, Constants } from "../../flux";
export default class Tour extends Component {
  constructor() {
    super();
    this.state = {
      tours: [],
      places: []
    };
    Dispatcher.dispatch({
      actionType: Constants.LIST_TOURS
    });
    Dispatcher.dispatch({
      actionType: Constants.LIST_PLACES
    });
  }
  componentWillMount() {
    Store.addChangeListener(this.onChange.bind(this));
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    console.log(Store.getTours());
    this.setState({ tours: Store.getTours(), places: Store.getPlaces() });
  }
  render() {
    return (
      <div>
        <Table items={this.state.tours} places={this.state.places} />{" "}
      </div>
    );
  }
}
