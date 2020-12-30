import React, { Component } from "react";
import Table from "../components/ticket/clienttable";

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
  DatePicker,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container
} from "shards-react";

import PopupNotification from "../components/utils/popupnotification";

import Lib from "../utils/lib";

import PageTitle from "../../components/common/PageTitle";

import DateTimePicker from "react-datetime-picker";

import { Store, Dispatcher, Constants } from "../../flux";

import APIHelper from "../utils/apihelper.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);

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
    console.log("passsportId", passsportExpiryDate);

    this.state = {
      address: address || "",
      citizenId: citizenId || 0,
      customerId: customerId,
      customerName: customerName || window.currentUser.displayName,
      customerType: customerType || "Native",
      passsportExpiryDate: new Date(passsportExpiryDate),
      passsportId: passsportId || 0,
      phone: phone || 0,
      visaExpiryDate: new Date(visaExpiryDate),
      visaId: visaId || 0,
      showResult: false,
      resultContent: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onDateChange(name, date) {
    this.setState({ [name]: date });
  }
  showTourPicker() {
    this.setState({ tourPicker: true });
  }
  pickTour(tour) {
    this.setState({ tourPicker: false, currentTour: tour });
  }

  onInputChange(name, value) {
    console.log(value, "value");

    this.setState({ [name]: value.target.value });
  }

  onSave() {
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

  render() {
    return (
      <div className="customer-profile">
        <Container fluid className="main-content-container pt-5">
          <Row className="justify-content-md-center">
            <Col md="6">
              <Card>
                <CardHeader>
                  <Row noGutters className="page-header py-4">
                    <PageTitle
                      sm="4"
                      title="CUSTOMER INFORMATION"
                      className="text-sm-left"
                    />
                  </Row>
                </CardHeader>
                <CardBody>
                  {" "}
                  <ListGroup flush>
                    <ListGroupItem className="p-3">
                      <Row>
                        <Col>
                          <Form>
                            <Row form>
                              <Col md="6" className="form-group">
                                <label htmlFor="tName">Full Name</label>
                                <FormInput
                                  onChange={value =>
                                    this.onInputChange("customerName", value)
                                  }
                                  value={this.state.customerName}
                                  innerRef={elem => (this.iName = elem)}
                                  id="tName"
                                  placeholder="Full Name"
                                />
                              </Col>
                              <Col md="6" className="form-group">
                                <label htmlFor="tType">Type</label>
                                <FormSelect
                                  onChange={value =>
                                    this.onInputChange("customerType", value)
                                  }
                                  value={this.state.customerType}
                                  innerRef={elem => (this.iType = elem)}
                                  id="tType"
                                >
                                  {["Native", "Foreigner"].map(
                                    (type, index) => (
                                      <option key={index} value={type}>
                                        {type}
                                      </option>
                                    )
                                  )}
                                </FormSelect>
                              </Col>
                            </Row>
                            {this.state.customerType.toLowerCase() ===
                            "native" ? (
                              <Row form>
                                <Col md="6" className="form-group">
                                  <label htmlFor="tName">Citizen ID</label>
                                  <FormInput
                                    onChange={value =>
                                      this.onInputChange("citizenId", value)
                                    }
                                    value={this.state.citizenId}
                                    type="number"
                                    placeholder="Citizen ID"
                                  />
                                </Col>
                              </Row>
                            ) : null}
                            {this.state.customerType.toLowerCase() ===
                            "foreigner" ? (
                              <Row form>
                                <Col md="6" className="form-group">
                                  <label htmlFor="tName">Passport Number</label>
                                  <FormInput
                                    onChange={value =>
                                      this.onInputChange("passsportId", value)
                                    }
                                    value={this.state.passsportId}
                                    type="number"
                                    placeholder="Passport Number"
                                  />
                                </Col>
                                <Col md="6" className="form-group">
                                  <label htmlFor="tType">Passport Expiry</label>
                                  <br />
                                  <DateTimePicker
                                    clearIcon={null}
                                    disableClock
                                    onChange={value =>
                                      this.onDateChange(
                                        "passsportExpiryDate",
                                        value
                                      )
                                    }
                                    value={this.state.passsportExpiryDate}
                                  />
                                </Col>
                              </Row>
                            ) : null}
                            {this.state.customerType.toLowerCase() ===
                            "foreigner" ? (
                              <Row form>
                                <Col md="6" className="form-group">
                                  <label htmlFor="tName">Visa Number</label>
                                  <FormInput
                                    onChange={value =>
                                      this.onInputChange("visaId", value)
                                    }
                                    value={this.state.visaId}
                                    type="number"
                                    placeholder="Visa Number"
                                  />
                                </Col>
                                <Col md="6" className="form-group">
                                  <label htmlFor="tType">Passport Expiry</label>
                                  <br />
                                  <DateTimePicker
                                    clearIcon={null}
                                    disableClock
                                    onChange={value =>
                                      this.onDateChange("visaExpiryDate", value)
                                    }
                                    value={this.state.visaExpiryDate}
                                  />
                                </Col>
                              </Row>
                            ) : null}
                            <Row form>
                              <Col md="6" className="form-group">
                                <label htmlFor="tName">Address</label>
                                <FormInput
                                  onChange={value =>
                                    this.onInputChange("address", value)
                                  }
                                  value={this.state.address}
                                  placeholder="Address"
                                />
                              </Col>
                              <Col md="6" className="form-group">
                                <label htmlFor="tName">Phone</label>
                                <FormInput
                                  onChange={value =>
                                    this.onInputChange("phone", value)
                                  }
                                  value={this.state.phone}
                                  type="number"
                                  placeholder="Phone"
                                />
                              </Col>
                            </Row>
                          </Form>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.onSave} size="md" theme="primary">
                    SAVE
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
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
