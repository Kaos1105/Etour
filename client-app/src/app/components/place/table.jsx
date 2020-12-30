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

import ViewModal from "./viewmodal";
import Lib from "../../utils/lib";

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
              subtitle="PLACE MANAGEMENT"
              className="text-sm-left"
            />
          </Row>

          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Active Places</h6>
                  <Button
                    theme="primary"
                    className="mb-2 mt-2"
                    onClick={this.openNewModal.bind(this)}
                  >
                    NEW
                  </Button>
                  <FormInput
                    placeholder="Filter by place name"
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
                        {/* <th scope="col" className="border-0">
                          Description
                        </th>
                        <th scope="col" className="border-0">
                          Notes
                        </th> */}
                        <th scope="col" className="border-0">
                          Belong to
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.places
                        .filter(
                          place =>
                            place.isActive &&
                            Lib.renderFullPlace(place)
                              .toLowerCase()
                              .includes(this.state.searched.toLowerCase())
                        )
                        .map((place, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{place.placeName}</td>
                            {/* <td>{place.description}</td>
                            <td>{place.notes}</td> */}
                            <td>
                              {(place.parentPlace &&
                                place.parentPlace.placeName) ||
                                "None"}
                            </td>
                            <td>
                              <Button
                                theme="secondary"
                                className="mr-1"
                                onClick={() => this.openViewModal(place)}
                              >
                                VIEW
                              </Button>
                              <Button
                                theme="warning"
                                className="mr-1"
                                onClick={() => this.openEditModal(place)}
                              >
                                EDIT
                              </Button>
                              <Button
                                onClick={() => this.openRemoveModal(place)}
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
            places={this.props.places}
          />
        ) : null}
        {this.state.editModal ? (
          <EditModal
            item={this.state.currentItem}
            places={this.props.places}
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
            places={this.props.places}
            item={this.state.currentItem}
            cancel={this.closeViewModal.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
