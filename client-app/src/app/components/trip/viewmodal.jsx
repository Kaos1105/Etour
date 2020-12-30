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
  FormTextarea
} from "shards-react";

import PopupNotification from "../utils/popupnotification";
import APIHelper from "../../utils/apihelper.js";
import { Dispatcher, Constants } from "../../../flux";

import DateTimePicker from "react-datetime-picker";

import Lib from "../../utils/lib";

export default class ViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      resultContent: {}
    };
  }

  render() {
    const {
      tripName,
      description,
      notes,
      tripType,
      startDate,
      endDate,
      tour,
      price,
      tripCapacity
    } = this.props.item;
    const { cancel } = this.props;
    return (
      <div>
        {" "}
        <Modal size="lg" open={true} centered>
          <ModalHeader> VIEW TRIP </ModalHeader>{" "}
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
                            disabled
                            defaultValue={tripName}
                            innerRef={elem => (this.iName = elem)}
                            id="tName"
                            placeholder="Name"
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tCapacity">Capacity</label>
                          <FormInput
                            disabled
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
                            disabled
                            id="tsDate"
                            value={new Date(startDate)}
                            clearIcon={null}
                            minDate={new Date()}
                          />
                        </Col>
                        <Col md="6" className="form-group">
                          <label htmlFor="tsEnd">End at</label>
                          <br />
                          <DateTimePicker
                            value={new Date(endDate)}
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
                            disabled
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
                            disabled
                            defaultValue={price}
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
                            <Col md="12">
                              <FormInput
                                value={tour.tourName}
                                disabled
                                innerRef={elem => (this.iTour = elem)}
                                id="tTour"
                                placeholder="Pick a tour"
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <FormGroup>
                        <label htmlFor="tDescription">Description</label>
                        <FormTextarea
                          disabled
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
                          disabled
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
            <Button theme="white" onClick={cancel}>
              CLOSE{" "}
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
