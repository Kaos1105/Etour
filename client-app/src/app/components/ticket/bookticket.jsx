import React, { Component } from "react";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  Button,
  FormTextarea
} from "shards-react";

import Lib from "../../utils/lib";
import PopupNotification from "../utils/popupnotification";
import APIHelper from "../../utils/apihelper.js";
import { Dispatcher, Constants } from "../../../flux";

import DateTimePicker from "react-datetime-picker";

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      resultContent: {}
    };
  }
  save() {
    let {
      customerId,
      tripId,
      price,
      status,
      tripCapacity,
      tickets
    } = this.props.data;
    status = "BOOKED";
    if (
      tripCapacity -
        tickets.filter(ticket => ticket.status !== "CANCELED").length <=
      0
    ) {
      return this.setState({
        showResult: true,
        resultContent: {
          title: "Out of stock",
          content: `Opps, tickets have sold out ! `,
          closeTop: this.props.cancel
        }
      });
    }
    console.log({
      customerId,
      tripId,
      price,
      status,
      tripCapacity
    });
    if (
      customerId &&
      tripId &&
      price > 0 &&
      status &&
      tripCapacity - tickets.filter(ticket => ticket.status !== "CANCELED").length > 0
    ) {
      const data = { customerId, tripId, ticketPrice: price, status };
      APIHelper.post(window.API_DOMAIN + "/api/tickets", data)
        .then(resp => {
          if (!resp.errors) {
            this.setState(
              {
                showResult: true,
                resultContent: {
                  title: "Success",
                  content: `You have successfully booked this ticket!`,
                  closeTop: this.props.cancel
                }
              },
              () => {
                Dispatcher.dispatch({
                  actionType: Constants.LIST_TICKETS
                });
              }
            );
          } else {
            this.setState({
              showResult: true,
              resultContent: {
                title: "Ticket Booked",
                content: "You have booked this trip before !",
                closeTop: this.props.cancel
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

  render() {
    const {
      tripName,
      startDate,
      endDate,
      tour,
      price,
      tripType,
      customerName
    } = this.props.data;
    const { cancel } = this.props;
    return (
      <div>
        {" "}
        <Modal size="lg" open={true} centered>
          <ModalHeader>BOOK THIS TICKET</ModalHeader>{" "}
          <ModalBody>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tName">Your Name</label>
                          <FormInput
                            disabled
                            defaultValue={customerName}
                            placeholder="Name"
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tName">Trip Name</label>
                          <FormInput
                            disabled
                            defaultValue={tripName}
                            innerRef={elem => (this.iName = elem)}
                            id="tName"
                            placeholder="Name"
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="tType">Type</label>
                          <FormSelect disabled defaultValue={tripType}>
                            {["Sale", "Normal"].map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tPrice">Price (VND)</label>
                          <FormInput
                            disabled
                            defaultValue={price}
                            type="number"
                            placeholder="Price"
                          />
                        </Col>
                      </Row>

                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="tName">Origin</label>
                          <FormInput
                            disabled
                            defaultValue={Lib.renderFullPlace(tour.startPlace)}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tName">Destination</label>
                          <FormInput
                            disabled
                            defaultValue={Lib.renderFullPlace(tour.endPlace)}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="tsDate">Start at</label>
                          <br />
                          <DateTimePicker
                            disabled
                            value={new Date(startDate)}
                            clearIcon={null}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tsEnd">End at</label>
                          <br />
                          <DateTimePicker
                            value={new Date(endDate)}
                            clearIcon={null}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Form>{" "}
                  </Col>{" "}
                </Row>{" "}
              </ListGroupItem>{" "}
            </ListGroup>{" "}
          </ModalBody>{" "}
          <ModalFooter>
            <Button theme="primary" onClick={this.save.bind(this)}>
              BOOK NOW{" "}
            </Button>{" "}
            <Button theme="white" onClick={cancel}>
              CANCEL{" "}
            </Button>{" "}
          </ModalFooter>{" "}
        </Modal>{" "}
        {this.state.showResult && (
          <PopupNotification
            title={this.state.resultContent.title}
            content={this.state.resultContent.content}
            close={() =>
              this.setState({ showResult: false }, () => {
                this.state.resultContent.closeTop &&
                  this.state.resultContent.closeTop();
              })
            }
          />
        )}{" "}
      </div>
    );
  }
}
