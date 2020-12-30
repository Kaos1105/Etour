import React, { Component } from "react";
import Table from "../components/trip/table";

import { Store, Dispatcher, Constants } from "../../flux";
export default class Tour extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      tours: []
    };
    Dispatcher.dispatch({
      actionType: Constants.LIST_TRIPS
    });
    Dispatcher.dispatch({
      actionType: Constants.LIST_TOURS
    });
  }
  componentWillMount() {
    Store.addChangeListener(this.onChange.bind(this));
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    console.log(Store.getTrips());
    this.setState({ tours: Store.getTours(), trips: Store.getTrips() });
  }
  render() {
    return (
      <div>
        <Table items={this.state.trips} tours={this.state.tours} />{" "}
      </div>
    );
  }
}
