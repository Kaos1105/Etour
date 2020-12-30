/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  FormTextarea
} from "shards-react";

import DateTimePicker from "react-datetime-picker";

import PageTitle from "../../components/common/PageTitle";

import Lib from "../utils/lib";
import Config from "../../config/index";
import { Store, Dispatcher, Constants } from "../../flux";

import Table from "../components/booking/table";

export default class BookingPage extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      pickedTrip: null,
      start: null,
      end: null,
      destination: "",
      searchedTrips: null
    };
    Dispatcher.dispatch({
      actionType: Constants.LIST_TRIPS
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
    this.setState({
      trips: Store.getTrips().filter(
        item => item.tripCapacity - item.tickets.filter(ticket => ticket.status !== "CANCELED").length > 0
      )
    });
  }

  onStartDateChange(date) {
    console.log(date);
    this.setState({ start: date });
  }

  onEndDateChange(date) {
    console.log(date);
    this.setState({ end: date });
  }

  onDestinationChange(event) {
    this.setState({ destination: event.target.value });
  }

  onSearch() {
    const isValid = item => {
      const validDestination = Lib.renderFullPlace(item.tour.endPlace)
        .toLowerCase()
        .includes(this.state.destination.toLowerCase());
      const tourStart = new Date(item.startDate);
      const tourEnd = new Date(item.endDate);
      tourStart.setHours(0, 0, 0, 0);
      tourEnd.setHours(0, 0, 0, 0);
      const inputStart = new Date(this.state.start);
      const inputEnd = new Date(this.state.end);
      inputStart.setHours(0, 0, 0, 0);
      inputEnd.setHours(0, 0, 0, 0);
      const validStart = !this.state.start || tourStart >= inputStart;
      const validEnd = !this.state.end || tourEnd <= inputEnd;
      return validDestination && validStart && validEnd;
    };
    this.setState({ searchedTrips: this.state.trips.filter(isValid) });
  }

  render() {
    return (
      <div>
        <header class="main_menu">
          <div class="main_menu_iner">
            <div class="container">
              <div class="row align-items-center ">
                <div class="col-lg-12">
                  <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
                    <a class="navbar-brand" href="/booking">
                      {" "}
                      <img src={Config.LOGO_URL} width={70} alt="logo" />{" "}
                    </a>

                    {window.currentUser ? (
                      <a href="/user-profile" className="user-welcome-text">
                        Welcome,{" "}
                        {window.currentUser.customer.customerName ||
                          window.currentUser.displayName}
                      </a>
                    ) : (
                      <a
                        href="/login?redirect=/booking"
                        class="btn_1 d-lg-block"
                      >
                        log in
                      </a>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section class="banner_part">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-lg-10">
                <div class="banner_text text-center">
                  <div class="banner_text_iner">
                    <h1> Torikatravel</h1>
                    <p>
                      Let’s start your journey with us, your dream will come
                      true
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="booking_part">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="booking_menu">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <i
                        class="nav-link"
                        id="place-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="place"
                        aria-selected="false"
                      >
                        destination
                      </i>
                    </li>
                    <li class="nav-item">
                      <i
                        class="nav-link"
                        id="place-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="place"
                        aria-selected="false"
                      >
                        start from
                      </i>
                    </li>
                    <li class="nav-item">
                      <i
                        class="nav-link"
                        id="place-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="place"
                        aria-selected="false"
                      >
                        end till
                      </i>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="booking_content">
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade active show"
                      id="hotel"
                      role="tabpanel"
                      aria-labelledby="hotel-tab"
                    >
                      <div class="booking_form">
                        <Form>
                          <Row form>
                            <Col md="4" className="form-group">
                              <FormInput
                                innerRef={elem => (this.iName = elem)}
                                id="plName"
                                onChange={this.onDestinationChange.bind(this)}
                                value={this.state.destination}
                                placeholder="Where you go ?"
                              />
                            </Col>{" "}
                            <Col md="4" className="form-group">
                              <DateTimePicker
                                disableClock
                                minDate={new Date()}
                                value={this.state.start}
                                onChange={this.onStartDateChange.bind(this)}
                              />
                            </Col>{" "}
                            <Col md="4" className="form-group">
                              <DateTimePicker
                                disableClock
                                onChange={this.onEndDateChange.bind(this)}
                                value={this.state.end}
                                minDate={new Date()}
                              />
                            </Col>{" "}
                          </Row>
                        </Form>
                        <form action="#">
                          <div class="form-row">
                            <div class="form_btn">
                              <i
                                onClick={this.onSearch.bind(this)}
                                class="btn_1"
                              >
                                search
                              </i>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="booking_list">
                  {this.state.searchedTrips &&
                  this.state.searchedTrips.length > 0 ? (
                    <Table items={this.state.searchedTrips} />
                  ) : (
                    <div
                      className={
                        "no-result-text " +
                        (!this.state.searchedTrips ? "d-none" : "")
                      }
                    >
                      Hey, the tour you were looking for is not available yet,
                      try another one !
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
