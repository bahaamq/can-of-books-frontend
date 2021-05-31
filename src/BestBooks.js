import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class BestBooks extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            server:process.env.REACT_APP_SERVER_URL,
            email:'',
            books:[]
        }
      }

      componentDidMount= async () => {
        const { user} = this.props.auth0;

        try {
          const paramsObj = {
            email: user.email
          }
          const books = await axios.get(`${this.state.server}/book`, {params: paramsObj});
          console.log(books.data)
          this.setState({
           books:books.data
          });
        } catch (error) {
          console.log(error);
        }
      
    }
   render() {
    return (
      <>

{this.state.books.map((item, idx) => {
                        return (
                            <div key={idx}>
                                {item.name}
                                {item.description}
                            </div>
                        )
                    })
                }
            </>
        );
    }
}




export default withAuth0(BestBooks);
