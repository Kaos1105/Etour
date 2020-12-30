/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalBody,
  FormInput
} from "shards-react";

import PageTitle from "../../../components/common/PageTitle";

import Lib from "../../utils/lib";

export default ({ pick, tours }) => {
  const [searched, setSearched] = useState("");
  console.log("tours", tours);
  return (
    <div class="tour-picker">
      <Modal size="lg" centered open={true}>
        <ModalBody>
          <Container fluid className="main-content-container px-4">
            {/* Default Light Table */}
            <Row>
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Select a tour</h6>
                    <FormInput
                      placeholder="Filter by place"
                      value={searched}
                      onChange={event => setSearched(event.target.value)}
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
                            Duration
                          </th>
                          <th scope="col" className="border-0">
                            Start
                          </th>
                          <th scope="col" className="border-0">
                            End
                          </th>
                          <th scope="col" className="border-0">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tours
                          .filter(item => item.isActive)
                          .filter(
                            item =>
                              Lib.renderFullPlace(item.startPlace)
                                .toLowerCase()
                                .includes(searched.toLowerCase()) ||
                              Lib.renderFullPlace(item.endPlace)
                                .toLowerCase()
                                .includes(searched.toLowerCase())
                          )
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.tourName}</td>
                              <td>{item.tourType}</td>
                              <td>{item.tourDuration}</td>
                              <td>{Lib.renderFullPlace(item.startPlace)}</td>
                              <td>{Lib.renderFullPlace(item.endPlace)}</td>

                              <td>
                                <Button
                                  theme="primary"
                                  className="mr-1"
                                  onClick={() => pick(item)}
                                >
                                  PICK
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
        </ModalBody>
      </Modal>
    </div>
  );
};
