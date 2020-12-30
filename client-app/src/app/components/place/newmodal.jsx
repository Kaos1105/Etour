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

export default class NewTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      resultContent: {}
    };
  }
  save() {
    const name = this.iName.value;
    const desc = this.iDesc.value;
    const notes = this.iNotes.value;
    const belong = this.iBelong.value;
    if (name && name.length >= 0) {
      const data = {
        placeName: name,
        description: desc,
        notes: notes,
        parentPlaceId: (belong && belong !== "none" && belong) || null
      };
      APIHelper.post(window.API_DOMAIN + "/api/places", data)
        .then(resp => {
          if (!resp.errors) {
            this.setState(
              {
                showResult: true,
                resultContent: {
                  title: "Success",
                  content: "You have successfully created a new place !",
                  closeTop: this.props.cancel
                }
              },
              () => {
                Dispatcher.dispatch({
                  actionType: Constants.LIST_PLACES
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
    const { cancel, places } = this.props;
    return (
      <div>
        {" "}
        <Modal open={true} centered>
          <ModalHeader>NEW PLACE</ModalHeader>
          <ModalBody>
            <ListGroup flush>
              <ListGroupItem className="p-3">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="plName">Name</label>
                          <FormInput
                            innerRef={elem => (this.iName = elem)}
                            id="plName"
                            placeholder="Name"
                          />
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="plDescription">Description</label>
                        <FormTextarea
                          innerRef={elem => (this.iDesc = elem)}
                          size="lg"
                          id="plDescription"
                          placeholder="Description"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="plNotes">Notes</label>
                        <FormTextarea
                          innerRef={elem => (this.iNotes = elem)}
                          size="lg"
                          id="plNotes"
                          placeholder="Notes"
                        />
                      </FormGroup>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="plBelong">Belong to</label>
                          <FormSelect
                            innerRef={elem => (this.iBelong = elem)}
                            id="plBelong"
                          >
                            <option value="none">None</option>
                            {places.map((place, index) => (
                              <option key={index} value={place.placeId}>
                                {place.placeName}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
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
      </div>
    );
  }
}
