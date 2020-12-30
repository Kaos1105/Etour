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
    const { placeName, description, notes, parentPlace } = this.props.item;
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
                          <label htmlFor="plName"> Name </label>{" "}
                          <FormInput
                            disabled
                            defaultValue={placeName}
                            innerRef={elem => (this.iName = elem)}
                            id="plName"
                            placeholder="Name"
                          />
                        </Col>{" "}
                      </Row>{" "}
                      <FormGroup>
                        <label htmlFor="plDescription"> Description </label>{" "}
                        <FormTextarea
                          disabled
                          defaultValue={description}
                          innerRef={elem => (this.iDesc = elem)}
                          size="lg"
                          id="plDescription"
                          placeholder="Description"
                        />
                      </FormGroup>{" "}
                      <FormGroup>
                        <label htmlFor="plNotes"> Notes </label>{" "}
                        <FormTextarea
                          disabled
                          defaultValue={notes}
                          innerRef={elem => (this.iNotes = elem)}
                          size="lg"
                          id="plNotes"
                          placeholder="Notes"
                        />
                      </FormGroup>{" "}
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="plBelong"> Belong to </label>{" "}
                          <FormSelect
                            disabled
                            defaultValue={
                              (parentPlace && parentPlace.placeId) || "none"
                            }
                            innerRef={elem => (this.iBelong = elem)}
                            id="plBelong"
                          >
                            <option value="none"> None </option>{" "}
                            {places.map((place, index) => (
                              <option key={index} value={place.placeId}>
                                {" "}
                                {place.placeName}{" "}
                              </option>
                            ))}{" "}
                          </FormSelect>{" "}
                        </Col>{" "}
                      </Row>{" "}
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
