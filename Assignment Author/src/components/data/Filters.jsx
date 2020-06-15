import React from "react";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import moment from "moment";
import { Row, Col, InputGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

class Spinner extends React.Component {
 




  render() {
    return (
      <>
        <Row className="pb-2">
          <Col>Filters</Col>
          <Col className="col-auto">
            <button 
              type="button" 
              className="btn btn-link"
              onClick={this.props.closeFilter}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={3}>
            <InputGroup>
              <DatePicker
                placeholderText="Published date"
                selected={this.props.startDate}
                onChange={this.props.handleDateChange}
                dateFormat="yyyy-MM-d "
                isClearable
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={12} sm={3}>
            <InputGroup>
              <input
                type="text"
                id="authorName"
                placeholder="Author name"
                value={this.props.authorName}
                onChange={this.props.searchAuthorName}
                className="form-control"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={12} sm={3}>
            <ReactSelect
              id="siteName"
              isClearable={true}
              isSearchable={false}
              options={this.props.siteData}
              placeholder="Site name"
              value={this.props.selectedSiteName}
              onChange={this.props.searchSiteName}
              displayValue="label"
              hideSelectedOptions={false}
              closeMenuOnSelect={true}
              aria-labelledby="uniqueBrand"
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Spinner;
