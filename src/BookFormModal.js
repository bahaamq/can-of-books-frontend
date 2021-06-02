import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const axios = require("axios");

class BookFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      description: "",
      img: "",
      newBook: [],
    };
  }

  getName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  getStatus = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  getDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  getImg = (event) => {
    this.setState({
      img: event.target.value,
    });
  };

  handlesubmit = async (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;

    try {
      const addBooksObj = {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
        img: this.state.img,
        email: user.email,
      };

      const newBook = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/Addbook`,
        addBooksObj
      );
      this.setState({
        newBook: newBook.data,
      });
      this.props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <Modal show={this.props.shows} onHide={this.props.handleClose}>
          <Modal.Header closeButton></Modal.Header>

          <Form onSubmit={this.handlesubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.getName}
              />

              <Form.Label>Book Description </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.getDesc}
              />

              <Form.Label>Book Status</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.getStatus}
              />

              <Form.Label>Book Img</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Name"
                onChange={this.getImg}
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
