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
  FormInput
} from "shards-react";

import PageTitle from "../../../components/common/PageTitle";
import NewModal from "./newmodal";
import EditModal from "./editmodal";
import RemoveModal from "./removemodal";

import Lib from "../../utils/lib";

import ViewModal from "./viewmodal";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newModal: false,
      editModal: false,
      removeModal: false,
      viewModal: false,
      currentItem: null,
      searched: ""
    };
  }

  openViewModal(item) {
    this.setState({ viewModal: true, currentItem: item });
  }

  closeViewModal() {
    this.setState({ viewModal: false });
  }

  openEditModal(item) {
    this.setState({ editModal: true, currentItem: item });
  }

  closeEditModal() {
    this.setState({ editModal: false });
  }

  openNewModal() {
    this.setState({ newModal: true });
  }

  closeNewModal() {
    this.setState({ newModal: false });
  }

  openRemoveModal(item) {
    this.setState({ removeModal: true, currentItem: item });
  }

  closeRemoveModal() {
    this.setState({ removeModal: false });
  }
  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              subtitle="TRIP MANAGEMENT"
              className="text-sm-left"
            />
          </Row>
          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0"> Active Trips </h6>
                  <Button
                    theme="primary"
                    className="mb-2 mt-2"
                    onClick={this.openNewModal.bind(this)}
                  >
                    NEW
                  </Button>
                  <FormInput
                    placeholder="Filter by trip name/ tour name"
                    value={this.state.searched}
                    onChange={event =>
                      this.setState({ searched: event.target.value })
                    }
                  ></FormInput>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          #
                        </th>
                        <th scope="col" className="border-0">
                          Name
                        </th>
                        <th scope="col" className="border-0">
                          Type
                        </th>
                        <th scope="col" className="border-0">
                          Start at
                        </th>
                        <th scope="col" className="border-0">
                          End at
                        </th>
                        <th scope="col" className="border-0">
                          Price
                        </th>
                        <th scope="col" className="border-0">
                          Tour
                        </th>
                        <th scope="col" className="border-0">
                          Remain Tickets
                        </th>
                        <th scope="col" className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.items
                        .filter(item => item.isActive)
                        .filter(
                          item =>
                            item.tripName
                              .toLowerCase()
                              .includes(this.state.searched.toLowerCase()) ||
                           item.tour.tourName
                              .toLowerCase()
                              .includes(this.state.searched.toLowerCase())
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {item.tripName} </td>
                            <td> {item.tripType} </td>
                            <td> {Lib.formatDate(item.startDate)} </td>
                            <td> {Lib.formatDate(item.endDate)} </td>
                            <td> {Lib.formatCurrency(item.price)} </td>
                            <td> {item.tour.tourName} </td>
                            <td>
                              {
                                item.tickets.filter(
                                  ticket => ticket.status !== "CANCELED"
                                ).length
                              }{" "}
                              / {item.tripCapacity}
                            </td>
                            <td>
                              <Button
                                theme="secondary"
                                className="mr-1"
                                onClick={() => this.openViewModal(item)}
                              >
                                VIEW
                              </Button>
                              <Button
                                theme="warning"
                                className="mr-1"
                                onClick={() => this.openEditModal(item)}
                              >
                                EDIT
                              </Button>
                              <Button
                                onClick={() => this.openRemoveModal(item)}
                                theme="danger"
                                className="mr-1"
                              >
                                DELETE
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {this.state.newModal ? (
          <NewModal
            cancel={this.closeNewModal.bind(this)}
            tours={this.props.tours}
          />
        ) : null}
        {this.state.editModal ? (
          <EditModal
            item={this.state.currentItem}
            tours={this.props.tours}
            cancel={this.closeEditModal.bind(this)}
          />
        ) : null}
        {this.state.removeModal ? (
          <RemoveModal
            item={this.state.currentItem}
            cancel={this.closeRemoveModal.bind(this)}
          />
        ) : null}
        {this.state.viewModal ? (
          <ViewModal
            item={this.state.currentItem}
            cancel={this.closeViewModal.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
