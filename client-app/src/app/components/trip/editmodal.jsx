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

import PopupNotification from "../utils/popupnotification";
import APIHelper from "../../utils/apihelper.js";
import { Dispatcher, Constants } from "../../../flux";

import DateTimePicker from "react-datetime-picker";

import TourPicker from "./tourpicker";
import Lib from "../../utils/lib";

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    const { tour, startDate } = this.props.item;
    this.state = {
      showResult: false,
      resultContent: {},
      startDate: new Date(startDate),
      tourPicker: false,
      currentTour: this.props.item.tour
    };
  }
  onDateChange(date) {
    this.setState({ startDate: date });
  }
  showTourPicker() {
    this.setState({ tourPicker: true });
  }
  pickTour(tour) {
    this.setState({ tourPicker: false, currentTour: tour });
  }
  save() {
    const name = this.iName.value;
    const desc = this.iDesc.value;
    const notes = this.iNotes.value;
    const type = this.iType.value;
    const tourId = this.state.currentTour && this.state.currentTour.tourId;
    const price = this.iPrice.value;
    const capacity = this.iCapacity.value;

    if (
      name &&
      name.length >= 0 &&
      tourId &&
      type &&
      price > 0 &&
      capacity >=
        this.props.item.tickets.filter(item => item.status !== "CANCELED")
          .length
    ) {
      const shiftDate = new Date(this.state.startDate.toString());
      shiftDate.setHours(this.state.startDate.getHours() + 7);
      const data = {
        tripName: name,
        description: desc,
        notes: notes,
        tripType: type,
        startDate: shiftDate.toISOString(),
        tourId: tourId,
        price: price,
        tripCapacity: capacity
      };
      APIHelper.put(
        window.API_DOMAIN + "/api/trips/" + this.props.item.tripId,
        data
      )
        .then(resp => {
          if (!resp.errors) {
            this.setState(
              {
                showResult: true,
                resultContent: {
                  title: "Success",
                  content: `You have successfully updated this trip !`,
                  closeTop: this.props.cancel
                }
              },
              () => {
                Dispatcher.dispatch({
                  actionType: Constants.LIST_TRIPS
                });
              }
            );
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

  render() {
    const {
      tripName,
      description,
      notes,
      tripType,
      price,
      tripCapacity
    } = this.props.item;
    const { cancel } = this.props;
    return (
      <div>
        {" "}
        <Modal size="lg" open={true} centered>
          <ModalHeader> EDIT TOUR </ModalHeader>{" "}
          <ModalBody>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="tName">Name</label>
                          <FormInput
                            defaultValue={tripName}
                            innerRef={elem => (this.iName = elem)}
                            id="tName"
                            placeholder="Name"
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tCapacity">Capacity</label>
                          <FormInput
                            defaultValue={tripCapacity}
                            type="number"
                            innerRef={elem => (this.iCapacity = elem)}
                            id="tCapacity"
                            placeholder="Capacity"
                          />
                        </Col>
                      </Row>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="tsDate">Start at</label>
                          <br />
                          <DateTimePicker
                            id="tsDate"
                            value={this.state.startDate}
                            onChange={this.onDateChange.bind(this)}
                            clearIcon={null}
                            minDate={new Date()}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tsEnd">End at</label>
                          <br />
                          <DateTimePicker
                            value={Lib.getNextDate(
                              this.state.startDate.toString(),
                              (this.state.currentTour &&
                                this.state.currentTour.tourDuration) ||
                                0
                            )}
                            id="tsEnd"
                            clearIcon={null}
                            minDate={new Date()}
                            disabled
                          />
                        </Col>
                      </Row>

                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="tType">Type</label>
                          <FormSelect
                            defaultValue={tripType}
                            innerRef={elem => (this.iType = elem)}
                            id="tType"
                          >
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
                            defaultValue={price}
                            innerRef={elem => (this.iPrice = elem)}
                            id="tPrice"
                            type="number"
                            placeholder="Price"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="8">
                          <FormInput
                            value={
                              (this.state.currentTour &&
                                this.state.currentTour.tourName) ||
                              "none"
                            }
                            disabled
                            innerRef={elem => (this.iTour = elem)}
                            id="tTour"
                            placeholder="Pick a tour"
                          />
                        </Col>
                        <Col md="4">
                          <Button
                            theme="primary"
                            onClick={this.showTourPicker.bind(this)}
                          >
                            Pick
                          </Button>
                        </Col>
                      </Row>

                      <FormGroup>
                        <label htmlFor="tDescription">Description</label>
                        <FormTextarea
                          defaultValue={description}
                          innerRef={elem => (this.iDesc = elem)}
                          size="lg"
                          id="tDescription"
                          placeholder="Description"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="tNotes">Notes</label>
                        <FormTextarea
                          defaultValue={notes}
                          innerRef={elem => (this.iNotes = elem)}
                          size="lg"
                          id="tNotes"
                          placeholder="Notes"
                        />
                      </FormGroup>
                    </Form>{" "}
                  </Col>{" "}
                </Row>{" "}
              </ListGroupItem>{" "}
            </ListGroup>{" "}
          </ModalBody>{" "}
          <ModalFooter>
            <Button theme="primary" onClick={this.save.bind(this)}>
              SAVE{" "}
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
        )}
        {this.state.tourPicker ? (
          <TourPicker
            tours={this.props.tours}
            pick={this.pickTour.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
