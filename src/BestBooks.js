import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            server:'http://localhost:3300',
            email:'',
            booksData:[],
            
        }
      }

      componentDidMount= async () => {
        const { user} = this.props.auth0;
        try {
          
          const paramsObj = {
            email: user.email
          }

          console.log(paramsObj.email)
          const books = await axios.get(`${this.state.server}/book`, {params: paramsObj});
          console.log(this.state.booksData)
          this.setState({
           booksData:books.data
          });

          console.log(user.email)
        } catch (error) {
          console.log(error);
        }
      
    }
   render() {
    return (
      <>
     

{this.state.booksData.map((item, idx) => {
                        return (
                          <Card key={idx} style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={item.image} />
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                              {item.description}<br/>
                              {item.status}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        )
                    })
                }
            </>
        );
    }
}




export default withAuth0(BestBooks);
