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
  FormCheckbox,
  Button,
  FormTextarea,
  DatePicker
} from "shards-react";

import DateTimePicker from "react-datetime-picker";

import PopupNotification from "../utils/popupnotification";
import APIHelper from "../../utils/apihelper.js";

import TourPicker from "./tourpicker";
import { Store, Dispatcher, Constants } from "../../../flux";
import Lib from "../../utils/lib";

export default class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      resultContent: {},
      startDate: new Date(),
      tourPicker: false,
      currentTour: null
    };
  }
  onDateChange(date) {
    this.setState({ startDate: date });
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
      capacity > 0
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
        tripCapacity: capacity,
        tripStatus: "ENABLED"
      };
      APIHelper.post(window.API_DOMAIN + "/api/trips", data)
        .then(resp => {
          if (!resp.errors) {
            this.setState(
              {
                showResult: true,
                resultContent: {
                  title: "Success",
                  content: "You have successfully created a new trip !",
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
  showTourPicker() {
    this.setState({ tourPicker: true });
  }
  pickTour(tour) {
    this.setState({ tourPicker: false, currentTour: tour });
  }
  render() {
    const { cancel, places } = this.props;
    return (
      <div>
        <Modal open={true} size="lg" centered>
          <ModalHeader>NEW TRIP</ModalHeader>
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
                            innerRef={elem => (this.iName = elem)}
                            id="tName"
                            placeholder="Name"
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tCapacity">Capacity</label>
                          <FormInput
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
                            defaultValue={0}
                            innerRef={elem => (this.iPrice = elem)}
                            id="tPrice"
                            type="number"
                            placeholder="Price"
                          />
                        </Col>
                      </Row>

                      <Row form>
                        <Col md="12" className="form-group">
                          <Row>
                            {" "}
                            <Col md="12">
                              <label htmlFor="tTour">Tour</label>
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
                        </Col>
                      </Row>

                      <FormGroup>
                        <label htmlFor="tDescription">Description</label>
                        <FormTextarea
                          innerRef={elem => (this.iDesc = elem)}
                          size="lg"
                          id="tDescription"
                          placeholder="Description"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="tNotes">Notes</label>
                        <FormTextarea
                          innerRef={elem => (this.iNotes = elem)}
                          size="lg"
                          id="tNotes"
                          placeholder="Notes"
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button theme="primary" onClick={this.save.bind(this)}>
              SAVE
            </Button>
            <Button theme="white" onClick={cancel}>
              CANCEL
            </Button>
          </ModalFooter>
        </Modal>
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
