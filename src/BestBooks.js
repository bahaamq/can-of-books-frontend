import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class BestBooks extends React.Component {
  render() {
    return (
      <>
        <CardGroup>
          {this.props.booksData.length>0&&this.props.booksData.map((item, idx) => {
            return (
              <Card key={idx} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description}
                    <br />
                    {item.status}
                  </Card.Text>
                  <button onClick={() => this.props.deleteBook(idx)}>Delete</button>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>
      </>
    );
  }
}

export default withAuth0(BestBooks);
