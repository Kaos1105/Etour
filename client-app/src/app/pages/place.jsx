import React, { Component } from "react";
import Table from "../components/place/table";

import { Store, Dispatcher, Constants } from "../../flux";
export default class Place extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
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
    console.log(Store.getPlaces());
    this.setState({ places: Store.getPlaces() });
  }
  render() {
    return (
      <div>
        <Table places={this.state.places} />{" "}
      </div>
    );
  }
}
