import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";


class autherDetail extends Component {
    //redirecting the to home page
  previousPage = () => {
    this.props.history.push("/home");
  };

  render() {
    const { title,publishedAt,author,source,url,urlToImage,content,description} = this.props.autherData;
    //protects the route if the user havent clecked the author card
    if(!source){
        this.props.history.push("/home");
    }
    return (
        <Container>
        <div className="news-card-detail">
        <div>
        <button
              type="button"
              className="btn btn-link"
              onClick={this.previousPage}
            >
          <i
            className="fa fa-arrow-left fa-2x"
            aria-hidden="true"
            onClick={this.previousPage}
          ></i>
           </button>
        </div>
        <h2>{title}</h2>
        <div>
            <p>{publishedAt} / {author} / {source ? source.name:''}/ {url}</p>
        </div>
        <div className="news-card-img">
          <img src={urlToImage} alt="newsImage" />
        </div>
        <div className="info-box">
          <h3>Content : </h3>
          <p>{content}</p>
        </div>
        <div  className="info-box">
          <h3>Description :</h3>
          <p>{description}</p>
        </div>
        <div className="info-box">
          <h3>PublishedAt:</h3>
          <p>{publishedAt}</p>
        </div>
        <div className="info-box">
          <h3>Url:</h3>
          <a href={`https://${url}`} target="blank">
            {url}
          </a>
        </div>
        <Row className="align-items-center">
            <Col className="col-auto">
              <h3 className="author-name">Author :</h3>
            </Col>
            <Col>
              <p className="author-name">{author}</p>
            </Col>
          </Row>
        </div>
        </Container>
   );
  }
}
const mapStateToProps = (state) => {
    return {
      autherData: state.reducer.auther,
    };
  };
  
  export default connect(mapStateToProps)(autherDetail);
  
  
