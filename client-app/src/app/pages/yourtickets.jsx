import React, { Component } from "react";
import Table from "../components/ticket/clienttable";

import BookModal from "../components/ticket/bookticket";

import { Store, Dispatcher, Constants } from "../../flux";

import Lib from "../utils/lib";

import PageTitle from "../../components/common/PageTitle";

import APIHelper from "../utils/apihelper.js";

export default class YourTickets extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      bookModal: false,
      ticketData: {}
    };
    Dispatcher.dispatch({
      actionType: Constants.LIST_USER_TICKETS,
      payload: { customerId: window.currentUser.customer.customerId }
    });
  }

  closeBookModal() {
    this.setState({ bookModal: false });
    Lib.reloadWithoutQuery();
  }

  componentDidMount() {
    this.willBookTicket();
  }
  willBookTicket() {
    const action = Lib.getParameterByName("action");
    const tripId = Lib.getParameterByName("param");
    console.log(action, tripId);
    if (action !== "book" || !tripId || !tripId.length) return;
    APIHelper.get(window.API_DOMAIN + "/api/trips/" + tripId).then(data => {
      console.log(data);
      const {
        address,
        citizenId,
        customerId,
        customerName,
        customerType,
        passsportExpiryDate,
        passsportId,
        phone,
        visaExpiryDate,
        visaId
      } = window.currentUser.customer;

      if (
        ([address, customerId, customerName, customerType, phone].filter(
          item => !item
        ).length === 0 &&
          customerType.toLowerCase() === "native" &&
          +citizenId > 0) ||
        (visaId &&
          passsportId &&
          Lib.compareTwoDates(
            new Date(passsportExpiryDate),
            new Date(data.endDate)
          ) === 1 &&
          Lib.compareTwoDates(
            new Date(visaExpiryDate),
            new Date(data.endDate)
          ) === 1)
      ) {
        this.setState({
          bookModal: true,
          ticketData: {
            ...data,
            customerId: window.currentUser.customer.customerId,
            customerName: window.currentUser.customer.customerName
          }
        });
      } else {
        Lib.navigateWithQuery(window.CLIENT_DOMAIN + "/user-profile");
      }
    });
  }

  onSaveTicket() {
    const {
      address,
      citizenId,
      customerId,
      customerName,
      customerType,
      passsportExpiryDate,
      passsportId,
      phone,
      visaExpiryDate,
      visaId
    } = this.state;

    const data = {
      address,
      citizenId,
      customerId,
      customerName,
      customerType,
      passsportExpiryDate: Lib.serializeISODateWithTimezone(
        passsportExpiryDate
      ),
      passsportId,
      phone,
      visaExpiryDate: Lib.serializeISODateWithTimezone(visaExpiryDate),
      visaId
    };

    if (customerType.toLowerCase() === "native") {
      delete data.passsportExpiryDate;
      delete data.visaExpiryDate;
    }

    if (
      customerName &&
      customerName.length >= 0 &&
      customerType &&
      +phone > 0 &&
      address &&
      ((customerType.toLowerCase() === "native" && +citizenId > 0) ||
        (+passsportId > 0 &&
          +visaId > 0 &&
          passsportExpiryDate &&
          visaExpiryDate))
    ) {
      APIHelper.put(window.API_DOMAIN + "/api/customers/" + customerId, data)
        .then(resp => {
          if (!resp.errors) {
            this.setState({
              showResult: true,
              resultContent: {
                title: "Success",
                content: `You have successfully updated your information !`,
                closeTop: () => {
                  if (Lib.getParameterByName("redirect")) {
                    return Lib.navigateWithQuery(
                      window.CLIENT_DOMAIN + Lib.getParameterByName("redirect")
                    );
                  }
                  window.location.reload();
                }
              }
            });
          } else {
            this.setState({
              showResult: true,
              resultContent: {
                title: "Failure",
                content: "An error has occurred, please try again !"
              }
            });
          }
        })
        .catch(e => {
          console.log(e);
          this.setState({
            showResult: true,
            resultContent: {
              title: "Failed",
              content: "Please check your network and try again !"
            }
          });
        });
    } else {
      this.setState({
        showResult: true,
        resultContent: {
          title: "Failed",
          content: "Please check your input and try again !"
        }
      });
    }
  }
  componentWillMount() {
    Store.addChangeListener(this.onChange.bind(this));
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange.bind(this));
  }

  onChange() {
    console.log(Store.getUserTickets());
    this.setState({
      tickets: Store.getUserTickets()
    });
  }
  render() {
    return (
      <div>
        <Table items={this.state.tickets} />{" "}
        {this.state.bookModal ? (
          <BookModal
            cancel={this.closeBookModal.bind(this)}
            data={this.state.ticketData}
          />
        ) : null}
      </div>
    );
  }
}
