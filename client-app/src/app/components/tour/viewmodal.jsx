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
      tourName,
      description,
      notes,
      tourType,
      tourDuration,
      startPlace,
      endPlace
    } = this.props.item;
    const { cancel, places } = this.props;
    return (
      <div>
        {" "}
        <Modal open={true} centered>
          <ModalHeader> VIEW PLACE </ModalHeader>{" "}
          <ModalBody>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tName"> Name </label>{" "}
                          <FormInput
                            disabled
                            defaultValue={tourName}
                            innerRef={elem => (this.iName = elem)}
                            id="tName"
                            placeholder="Name"
                          />
                        </Col>{" "}
                      </Row>{" "}
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tType"> Type </label>{" "}
                          <FormSelect
                            disabled
                            defaultValue={tourType}
                            innerRef={elem => (this.iType = elem)}
                            id="tType"
                          >
                            {["Internatonal", "Domestic"].map((type, index) => (
                              <option key={index} value={type}>
                                {" "}
                                {type}{" "}
                              </option>
                            ))}{" "}
                          </FormSelect>{" "}
                        </Col>{" "}
                      </Row>{" "}
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tDuration"> Duration(hour) </label>{" "}
                          <FormInput
                            disabled
                            defaultValue={tourDuration}
                            innerRef={elem => (this.iDuration = elem)}
                            id="tDuration"
                            type="number"
                            placeholder="Duration"
                          />
                        </Col>{" "}
                      </Row>{" "}
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tStart"> Start from </label>{" "}
                          <FormSelect
                            disabled
                            defaultValue={startPlace.placeId}
                            innerRef={elem => (this.iStart = elem)}
                            id="tStart"
                          >
                            {places.map((place, index) => (
                              <option key={index} value={place.placeId}>
                                {" "}
                                {place.placeName}{" "}
                              </option>
                            ))}{" "}
                          </FormSelect>{" "}
                        </Col>{" "}
                      </Row>{" "}
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="tEnd"> End in </label>{" "}
                          <FormSelect
                            disabled
                            defaultValue={endPlace.placeId}
                            innerRef={elem => (this.iEnd = elem)}
                            id="tEnd"
                          >
                            {places.map((place, index) => (
                              <option key={index} value={place.placeId}>
                                {" "}
                                {place.placeName}{" "}
                              </option>
                            ))}{" "}
                          </FormSelect>{" "}
                        </Col>{" "}
                      </Row>{" "}
                      <FormGroup>
                        <label htmlFor="tDescription"> Description </label>{" "}
                        <FormTextarea
                          disabled
                          defaultValue={description}
                          innerRef={elem => (this.iDesc = elem)}
                          size="lg"
                          id="tDescription"
                          placeholder="Description"
                        />
                      </FormGroup>{" "}
                      <FormGroup>
                        <label htmlFor="tNotes"> Notes </label>{" "}
                        <FormTextarea
                          disabled
                          defaultValue={notes}
                          innerRef={elem => (this.iNotes = elem)}
                          size="lg"
                          id="tNotes"
                          placeholder="Notes"
                        />
                      </FormGroup>{" "}
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
