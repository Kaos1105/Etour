import React, { Component } from "react";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from "shards-react";

import APIHelper from "../../utils/apihelper.js";

import { Dispatcher, Constants } from "../../../flux";

import PopupNotification from "../utils/popupnotification";

export default class RemoveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: false,
      resultContent: {}
    };
  }
  save() {
    APIHelper.delete(
      window.API_DOMAIN + "/api/tours/" + this.props.item.tourId
    )
      .then(resp => {
        if (!resp.errors) {
          this.setState(
            {
              showResult: true,
              resultContent: {
                title: "Success",
                content: `You have successfully deleted this place !`,
                closeTop: this.props.cancel
              }
            },
            () => {
              Dispatcher.dispatch({
                actionType: Constants.LIST_TOURS
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
  }

  render() {
    const { cancel, item } = this.props;
    return (
      <div>
        {" "}
        <Modal open={true} centered>
          <ModalHeader>DELETE TOUR</ModalHeader>
          <ModalBody>Do you want to remove tour {item.tourName} ?</ModalBody>
          <ModalFooter>
            <Button theme="danger" onClick={this.save.bind(this)}>
              DELETE
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
        )}{" "}
      </div>
    );
  }
}
