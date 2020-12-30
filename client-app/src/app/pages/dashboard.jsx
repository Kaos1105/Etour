import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../../components/common/PageTitle";
import SmallStats from "./../../components/common/SmallStats";
import TicketPie from "../components/dashboard/ticketchart";

import APIHelper from "../utils/apihelper.js";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: 0,
      trip: 0,
      ticket: 0,
      customer: 0,
      pieConfig: null
    };
  }
  componentDidMount() {
    ["tour", "trip", "ticket", "customer"].map((stat, idx) => {
      APIHelper.get(window.API_DOMAIN + "/api/" + stat + "s?limit=10000&isActive=true").then(data => {
        console.log(data);
        if (stat === "ticket") {
          const approvedRatio = data.tickets.filter(ticket => ticket.status === "APPROVED").length*100/data.ticketCount;
          const bookedRatio = data.tickets.filter(ticket => ticket.status === "BOOKED").length*100/data.ticketCount;
          const canceledRatio  = 100 - approvedRatio - bookedRatio;
          console.log(canceledRatio,approvedRatio,bookedRatio,data.tickets.filter(ticket => ticket.status ));
          const pieConfig = {
            datasets: [
              {
                hoverBorderColor: "#ffffff",
                data: [
                  approvedRatio ,
                  bookedRatio,
                  canceledRatio
                ],
                backgroundColor: [
                  "rgba(0,123,255,0.9)",
                  "rgba(0,123,255,0.5)",
                  "rgba(234,123,255,0.3)"
                ]
              }
            ],
            labels: ["Approved", "Booked", "Canceled"]
          };

          this.setState({ pieConfig });
        }
        this.setState({ [stat]: data[stat + "Count"] }, () =>
          console.log(data[stat + "Count"])
        );
      });
    });
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="TORIKA OVERVIEW"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {["tour", "trip", "ticket", "customer"].map((stat, idx) => (
            <Col className="col-lg mb-4" key={idx}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                label={stat}
                value={this.state[stat]}
              />
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center">
          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mt-4 mb-4">
            {this.state.pieConfig ?<TicketPie
              chartData={this.state.pieConfig}
              title="Tickets by status"
            />:null}
          </Col>
        </Row>
      </Container>
    );
  }
}
