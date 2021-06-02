import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./myFavoriteBooks.css";
import BestBooks from "./BestBooks";
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import { Button } from 'react-bootstrap'
import BookFormModal from "./BookFormModal";
import UpdateFormModale from "./UpdateFormModale";
class MyFavoriteBooks extends React.Component {
    _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      server: process.env.REACT_APP_SERVER_URL,
      email: "",
      booksData: [],
      name: "",
      status: "",
      description: "",
      img: "",
      showModal: false,
      showUpdate: false,
      updateIDX:0,
      
    }
    
  }
  getName = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  getStatus = (event) => {
    this.setState({
      status: event.target.value,
    })
  }

  getDesc = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  getImg = (event) => {
    this.setState({
      img: event.target.value,
    });
  };
  handleShow = () => {
    this.setState({
      showModal: true
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      showUpdate: false

    })
  }
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
      }

      const newBook = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/Addbook`,
        addBooksObj
      )
      this.setState({
        booksData: newBook.data,
        showModal: false
      })
    
    } 
    catch (error) {
      console.log(error);
    }

    this.handleClose();
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    try {
      const paramsObj = {
        email: user.email,
      }
      console.log(paramsObj.email);
      const books = await axios.get(`${this.state.server}/book`, {
        params: paramsObj,
      })
      console.log(this.state.booksData);
      this.setState({
        booksData: books.data,
      })

      console.log(user.email);
    }
    
    catch (error) {
      console.log(error);
    }
  }



  deleteBook = async (i) => {
    const { user } = this.props.auth0;
    let email = {
      email: user.email,
    }
    let deletABook = await axios.delete(
      `${this.state.server}/deletebook/${i}`,
      { params: email }
    )
    this.setState({
      booksData: deletABook.data,
    })
  }




  handleshowModule =(newIDX)=>{
this.setState({
  updateIDX:newIDX,
  showUpdate: true
})

  }

  updateBook = async(event) => {
    event.preventDefault();


    const { user } = this.props.auth0;
    try {
      const addBooksObj = {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
        img: this.state.img,
        email: user.email,
      }

      let updatedbook = await axios.put(
        `${this.state.server}/updateBook/${this.state.updateIDX}`,
        addBooksObj
      )
      this.setState({
        booksData: updatedbook.data
      })
    }
    catch (error) {
      console.log(error)
    }

    this.handleClose();

  }

  render() {
    return (
      <Jumbotron>
        <>
          <h1>My Favorite Books</h1>
          <p>This is a collection of my favorite books</p>
          <Button variant="primary" onClick={this.handleShow}>Add a Book</Button>

          <BookFormModal handlesubmit={this.handlesubmit} show={this.state.showModal}
            handleClose={this.handleClose} getName={this.getName} getDesc={this.getDesc} getImg={this.getImg} getStatus={this.getStatus} />





          <UpdateFormModale updateBook={this.updateBook} show={this.state.showUpdate}
            handleClose={this.handleClose} getName={this.getName} getDesc={this.getDesc} getImg={this.getImg} getStatus={this.getStatus} />


<BestBooks deleteBook={this.deleteBook} handleshowModule={this.handleshowModule} booksData={this.state.booksData} />

     
        </>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
