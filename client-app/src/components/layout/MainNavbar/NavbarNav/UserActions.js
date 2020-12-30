import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">
            {" "}
            {window.currentUser.customer.customerName ||
              window.currentUser.displayName}{" "}
          </span>{" "}
        </DropdownToggle>{" "}
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          {!window.currentUser.userName.includes("_admin") && (
            <DropdownItem tag={Link} to="booking">
              <i className="material-icons">play_arrow</i> Book new ticket
            </DropdownItem>
          )}{" "}
          {!window.currentUser.userName.includes("_admin") && (
            <DropdownItem tag={Link} to="user-profile">
              <i className="material-icons">&#xE7FD;</i> Profile{" "}
            </DropdownItem>
          )}
          {!window.currentUser.userName.includes("_admin") && (
            <DropdownItem tag={Link} to="your-tickets">
              <i className="material-icons"> text_snippet </i> Your Tickets{" "}
            </DropdownItem>
          )}
          <DropdownItem divider />
          <DropdownItem tag={Link} to="logout" className="text-danger">
            <i className="material-icons text-danger"> &#xE879; </i> Logout{" "}
          </DropdownItem>{" "}
        </Collapse>{" "}
      </NavItem>
    );
  }
}
