import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Redirect } from "react-router-dom";
import isAuthenticated from "../auth/index";
import TextField from "@material-ui/core/TextField";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";

class Evaluation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupData: [],
      GroupName: "",
      GroupNameInvalid: false,
      FormName: "", // Storing the name of the form that is selected
      
      PosterWeight: "", // FYP-1 (D) Mid Term
      IterationsDefinition_Weightage: "", // FYP-1 (D) Mid Term
      IterationsCompletion_Wightage: "", // FYP-1 (D) Mid Term
      PresentationQuality_Wightage:"", // FYP-1 (D) Mid Term
      ResearchQuality_Wightage:"", // FYP-1 (R&D) Mid Term
      Implementation_Wightage:"", // FYP-2 (D) Pre-job fair
      WorkQuality_Wightage:"", // FYP-2 (D) Pre-job fair
      CodeQuality_Wightage:"", // FYP-2 (D) Pre-job fair
      CodeIntegration_Wightage:"", // FYP-2 (D) Pre-job fair
      PreliminaryOutcomes_Wightage:"", // FYP-2 (R&D) Pre-job fair
      Work_suitable_Wightage:"", // FYP-2 (R&D) Pre-job fair
      ProjectImpression_Wightage:"", // FYP-1 (D) Final Term
      DemoQuality_Wightage:"", // FYP-1 (D) Final Term

    };

    // This is for the radio button in the form
    this.PosterWeightageChange = this.PosterWeightageChange.bind(this);
  }
  componentDidMount() {
    this.setState({ groupData: this.props.groupData });
    console.log("Group data is :", this.props.groupData);
  }

  async handleSubmit(values) {
    // let tLoad = toast.loading(this.state.GroupName) ;
    // console.log("Selected Group is: ",this.state.GroupName);
    // let tLoad = toast.loading(this.state.PosterWeight) ;
    // console.log("Iteration",this.IterationsDefinition_Weightage);
    
  }

  // Changing the value of radio button in the form

  PosterWeightageChange(event) {
    this.setState({
      PosterWeight: event.target.value,
    });
  }
  render() {
    let FormNameRadioButton = [
      " FYP1-Dev-Mid ",
      " FYP1-R&D-Mid ",
      " FYP2-Dev-Mid ",
      " FYP2-R&D-Mid ",
      " FYP1-Dev-Final ",
      " FYP1-R&D-Final ",
      " FYP2-Dev-Final ",
      " FYP2-R&D-Final ",
    ];
    let Percantage = [
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "45",
      "50",
      "55",
      "60",
      "65",
      "70",
    ];
    return (
      <>
        <div className="content">
          {!isAuthenticated(sessionStorage.getItem("HMS-Admin")) ? (
            <Redirect to="/admin/login" />
          ) : (
            <></>
          )}
          <Row className="justify-content-center">
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Set Evaluation Weightage</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    {/* Choosing the FYP Group that are stored in  Database */}
                    
                    {/* Choosing evaluation form */}
                    <Row className="justify-content-center">
                      <Col className="pr-1" md="8">
                        <FormGroup>
                          <p className="h7">Choose Evaluation Form</p>
                          <Input
                            type="select"
                            value={this.state.value}
                            onChange={(e) =>
                              this.setState({
                                FormName: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled selected>
                              Choose Form
                            </option>
                            {FormNameRadioButton.map((data, index) => {
                              return (
                                <option key={index} value={data.name}>
                                  {data}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <div>
                      {
                        this.state.FormName == "FYP1-Dev-Mid" ? ( // if selecting the first option
                          <div>
                            {/* I am form 1  */}
                            <br />
                            <MDBContainer>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="8">
                                  <form>
                                    <p className="h3 mb-7">
                                      <center>
                                        FYP-1 (D) Mid Term Evaluation
                                      </center>
                                    </p>
                                    <br />
                                    <br />
                                    <p className="h6">FYP Poster</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">Poster weightage</p>
                                      <Input
                                        type="select"
                                        onChange={this.PosterWeightageChange}
                                        value={this.state.value}
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                      {    console.log("Poster weight",this.state.PosterWeight)}
                                    </FormGroup>
                                    
                                    <p className="h6">Itration</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Iteration Definition, FYP Plan, Work
                                        Breakdown
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsDefinition_Weightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                      <p className="h7">
                                        Work complete for Iteration including
                                        design and implementation
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsCompletion_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <FormGroup>
                                    <p className="h6">
                                      Quality of the presentation
                                    </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentationQuality_Wightage: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                    
                                    <br />
                                    <br />
                                  </form>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </div>
                        ) : this.state.FormName == "FYP1-R&D-Mid" ? (
                          <div>
                            {/* I am form 2  */}
                            <br />
                            <MDBContainer>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="8">
                                  <form>
                                    <p className="h3 mb-4">
                                      <center>
                                        FYP-1 (R&D) Mid Term Evaluation
                                      </center>
                                    </p>
                                    <br />
                                    <br />
                                    <p className="h6">FYP Poster</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">Poster Marks</p>
                                      <Input
                                        type="select"
                                        onChange={this.PosterWeightageChange}
                                        value={this.state.value}
                                         required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <p className="h6">Itration</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Iteration Definition, FYP Plan, Work
                                        Breakdown
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsDefinition_Weightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    
                                    <FormGroup>
                                    <p className="h6">
                                      Quality of Research work (done so far)
                                    </p>
                                    <br />
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            ResearchQuality_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    
                                    <FormGroup>
                                    <p className="h6">
                                      Overall Quality of the presentation
                                    </p>
                                    <br />
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentationQuality_Wightage: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <br />
                                  </form>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </div>
                        ) : this.state.FormName == "FYP2-Dev-Mid" ? (
                          <div>
                            {/* I am form 3  */}

                            <br />
                            <MDBContainer>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="8">
                                  <form>
                                    <p className="h3 mb-4">
                                      <center>
                                        FYP-2 (D) Pre-job Fair Evaluation
                                      </center>
                                    </p>
                                    <br />
                                    <br />
                                    
                                    <p className="h6">Implementation</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">Implementation Work Completion</p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Implementation_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <p className="h6">work quality</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                      Overall work quality and impression
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            ProjectImpression_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                      <p className="h7">
                                      Code Quality
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            CodeIntegration_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <p className="h6">
                                      Integration
                                    </p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                      Level of code integration
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            CodeIntegration_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                    <br />
                                    <br />
                                  </form>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </div>
                        ) : this.state.FormName == "FYP2-R&D-Mid" ? (
                          <div>
                            {/* I am form 4  */}
                            <br />
                            <MDBContainer>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="8">
                                  <form>
                                    <p className="h3 mb-4">
                                      <center>
                                        FYP-2 (R&D) Pre-job Fair Evaluation
                                      </center>
                                    </p>
                                    <br />
                                    <br />
                                    <p className="h6">Implementation</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">Implementation Work Completion [Correctness of Methodology, Quality of Implementation of proposed approach ] </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Implementation_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <p className="h6">Outcomes</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                      Preliminary Outcomes/Results 
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PreliminaryOutcomes_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                      <p className="h7">
                                      Work suitable for the Job Fair
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Work_suitable_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <br />
                                  </form>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </div>
                        ) : this.state.FormName == "FYP1-Dev-Final" ? (
                          <div> 
                            {/* I am form 5 */}
                            <br />
                            <MDBContainer>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="8">
                                  <form>
                                    <p className="h3 mb-4">
                                      <center>
                                        FYP-1 (D) Final Term Evaluation
                                      </center>
                                    </p>
                                    <br />
                                    
                                    <p className="h6">Itration</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Iteration Definition, FYP Plan, Work
                                        Breakdown
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsDefinition_Weightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    
                                    <FormGroup>
                                    <br /><br />
                                    <p className="h6">
                                      Overall Quality of the presentation
                                    </p>
                                    <br />
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentationQuality_Wightage: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
    
                                    <br />
                                    <br />
                                    <p className="h6">Project Implementation, Impression and demo</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Implementation (Should be atleast 45%)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Implementation_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <p className="h7">
                                      Overall Project Impression
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            ProjectImpression_Wightage:e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <p className="h7">
                                      Quality of Demo
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            DemoQuality_Wightage: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                    <br />
                                    <br />
                                  </form>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>
                          </div>
                        ) : this.state.FormName == "FYP1-R&D-Final" ? (
                          <div> 
                            {/* I am form 6  */}
                            <br />
                            <MDBContainer>
                              <MDBRow className="justify-content-center">
                                <MDBCol md="8">
                                  <form>
                                    <p className="h3 mb-4">
                                      <center>
                                        FYP-1 (R&D) Final Term Evaluation
                                      </center>
                                    </p>
                                    <br />
                                    
                                    <p className="h6">Itration</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Iteration Definition, FYP Plan, Work
                                        Breakdown
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsDefinition_Weightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br /><br />
                                    
                                    <FormGroup>
                                    <p className="h6">
                                      overall Quality of the presentation
                                    </p>
                                    <br />
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentationQuality_Wightage: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>
                                        
                                    <br />
                                    <br />
                                    <p className="h6">Project Implementation, Impression</p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Design and Implementation (Should be atleast 45%)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Implementation_Wightage:e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <FormGroup>
                                      <p className="h7">
                                      Overall Project Impression
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            ProjectImpression_Wightage:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Percentage
                                        </option>
                                        {Percantage.map((data, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={data.name}
                                            >
                                              {data}
                                            </option>
                                          );
                                        })}
                                      </Input>
                                    </FormGroup>

                                    <br />
                                    <br />
                                  </form>
                                </MDBCol>
                              </MDBRow>
                            </MDBContainer>

                          </div>
                        ) : this.state.FormName == "FYP2-Dev-Final" ? (
                          <div> I am form 7 </div>
                        ) : this.state.FormName == "FYP2-R&D-Final" ? (
                          <div> I am form 8 </div>
                        ) : null
                        // console.log("form is :", this.state.groupData)
                      }
                    </div>

                    {/* form submission buttion */}
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Evaluation;
