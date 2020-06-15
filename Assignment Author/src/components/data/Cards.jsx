import React from "react";
import { Col, Card, Spinner } from "react-bootstrap";
import moment from 'moment';



export default function Cards(props) {
  const {getIndividualAuther}=props

  return (
    <>
    {props.newsData.length > 0 ? (
    <>
    {props.newsData.map((autherDetail ,i)=> {
      let publishedDate = moment(autherDetail.publishedAt).format('D MMMM YYYY')
     return( 
      <Col xs={3}>
     <Card className="news-card" key={i} onClick={()=>getIndividualAuther(autherDetail)} >
          <Card.Header>
        <Card.Img variant="top" src={autherDetail.urlToImage} />
        </Card.Header>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
            {publishedDate}
          </Card.Subtitle>
          <Card.Title>{autherDetail.title}</Card.Title>
          <Card.Text>
            {autherDetail.author}
          </Card.Text>
          <Card.Text>
           {autherDetail.content}
          </Card.Text>
          <Card.Link href="#">{autherDetail.source.name}</Card.Link>
        </Card.Body>
      </Card>
      </Col>
      );
    })}
       </> 
       ):  (
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <h1>No Data Found</h1>
        </Col>
      )}
    </>
  );
}


