/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";

import PageTitle from "../../../components/common/PageTitle";

import Lib from "../../utils/lib";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: null
    };
  }

  goToTicket(tripId) {
    window.location.href =
      window.CLIENT_DOMAIN +
      "/your-tickets?" +
      Lib.serializeToQuery({
        redirect: "/your-tickets",
        param: tripId,
        action: "book"
      });
  }

  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              subtitle="BOOK YOUR JOURNEY"
              className="text-sm-left"
            />
          </Row>
          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className="mb-4">
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
                          Origin
                        </th>
                        <th scope="col" className="border-0">
                          Destination
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
                        <th scope="col" className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.items
                        .filter(item => item.isActive)
                        .map((item, index) => (
                          <tr key={index}>
                            <td> {index + 1} </td>
                            <td> {item.tripName} </td>
                            <td> {item.tripType} </td>
                            <td>
                              {Lib.renderFullPlace(item.tour.startPlace)}{" "}
                            </td>
                            <td> {Lib.renderFullPlace(item.tour.endPlace)} </td>
                            <td> {Lib.formatDate(item.startDate)} </td>
                            <td> {Lib.formatDate(item.endDate)} </td>
                            <td> {Lib.formatCurrency(item.price)} </td>
                            <td>
                              <Button
                                theme="primary"
                                onClick={() => this.goToTicket(item.tripId)}
                                className="mr-1"
                              >
                                BOOK NOW
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
      </div>
    );
  }
}
