import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const axios = require("axios");

class BookFormModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Form onSubmit={this.props.handlesubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.props.getName}
              />
              <Form.Label>Book Description </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.props.getDesc}
              />
              <Form.Label>Book Status</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.props.getStatus}
              />
              <Form.Label>Book Img</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.props.getImg}
              />
            </Form.Group>

            <Modal.Footer>
              {/* for request */}
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={this.props.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}

export default withAuth0(BookFormModal);
