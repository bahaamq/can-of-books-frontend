import React, { Component } from "react";
// import Form from 'react-bootstrap/Form'
import BookFormModal from "./BookFormModal";
import Button from "react-bootstrap/Button";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add Book
        </Button>

        <BookFormModal
          shows={this.state.show}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
        />
      </>
    );
  }
}

export default AddBook;
