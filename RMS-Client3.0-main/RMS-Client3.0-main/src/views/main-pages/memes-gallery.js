
import React from "react";
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../../auth/index";
import { Carousel } from 'react-responsive-carousel';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class Memes extends React.Component {
  render() {
    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('Student')) ? <Redirect to="/auth/login" /> : <></>}
          
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Hostel Memes</CardTitle>
                </CardHeader>
                <CardBody>
                    <Carousel autoPlay>
                        <div>
                            <img alt="" src="https://i.pinimg.com/originals/d5/30/72/d530721e08e0e03e2def8024d90013c0.jpg" />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                        <div>
                            <img alt="" src="https://i.pinimg.com/originals/b0/1f/4a/b01f4a41bf16c079b8cc01d035fd0360.jpg" />
                            {/* <p className="legend">Legend 2</p> */}
                        </div>
                        <div>
                            <img alt="" src="https://simg-memechat.s3.ap-south-1.amazonaws.com/5ee7e943b988d6e1a8eb3807e51997f3.jpg" />
                            {/* <p className="legend">Legend 3</p> */}
                        </div>
                        <div>
                            <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoBXOHAvhreO9NP3YmDdi773vtC_Ndnm9INQ&usqp=CAU" />
                            {/* <p className="legend">Legend 4</p> */}
                        </div>
                    </Carousel>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default Memes;
