
import React from "react";
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../../auth/index";
import ReactTable from "components/ReactTable/ReactTable.js";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class Idea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AnnoucData:this.props.AnnoucData.map((prop, key) => {
              return {
                id: key,
                // day: prop.day,
                Title: prop.Title,
                details: prop.details,
              };
            }),
            // day: '', 
            Title: '',
            details: '',
            foodInvalid: false,
        }
    }
  render() {
    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('Student')) ? <Redirect to="/auth/login" /> : <></>}
          
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Ideas</CardTitle>
                </CardHeader>
                <CardBody>
                    <ReactTable
                      data={this.state.AnnoucData}
                      
                      columns={[
                      // {
                      //     Header: "Day",
                      //     accessor: "day",
                      // },
                      
                      {
                        Header: "Title",
                        accessor: "Title",
                      },
                      {
                        Header: "Details",
                        accessor: "details",
                      },
                      ]}
                      /*
                      You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                      */
                      className="-striped -highlight info-pagination"
                  />
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default Idea;
