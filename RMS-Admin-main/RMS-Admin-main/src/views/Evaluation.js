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
      radio: "",
      SelectRole: "", // selecting the role in the form
      SelectMeetingStatus: "", // selecting the meeting status in the form
      PosterWeightValue: "", // Poster value veriable in the form
      IterationsDefine_Marks: "", // Iteration defination value veriable in the form
      IterationsCompletion_Marks: "", // Iteration completion value veriable in the form
      SlideDesign_Marks: "", // Slide Design and content Quality value veriable in the form
      Style_Marks: "", // Style(Delivery, Confident, Clarity) value veriable in the form
      QuestionHadling_Marks: "", // Handling of the Questions value veriable in the form
      PresentTime_Marks: "", // Timing of the Presentation value veriable in the form
      TeamDynamics_Marks: "", // Team Dynamics  value veriable in the form
      Evaluation_Justification: "", // Evaluation Justification comment by evaluator
      Teachers_Comments: "",
      IntroToProblem_Marks: "", // Introduction of problem domain and the research problem statement variable for FYP1-R&D-Mid
      Literature_Survey_Marks: "", // Literature survey of at least 5 research items (Strengths,Weaknesses)	variable for FYP1-R&D-Mid
      Synthesis_of_Literature_Marks: "", // Synthesis of Literature/Relevance to own work	variable for FYP1-R&D-Mid
      Proposed_approach_Marks: "", // Proposed approach variable for FYP1-R&D-Mid
      Implemention_Marks: "", // Implementation variable for FYP1-D-Final
      ProjectImpression_Marks:"", // Overall Project Impression for FYP1-D-Final
      Demo_Marks:"", // for FYP1-Final
      CodeQuality_Marks:"", // Code Quality for FYP-2 Mid Term
      CodeIntegration_Marks:"", // Level of code integration in FYP-2 Mid Term
      Recomm_improvements:"", // Recommended improvements in case the progress is not suitable  FYP-2 Mid Term
      Preliminary_Outcomes:"", // Preliminary Outcomes/Results in FYP-2 Mid Term 
      Work_suitable:"", // Work suitable for the Job Fair in FYP-2 Mid Term 

    };

    this.changeGroupName = this.changeGroupName.bind(this);

    // This is for the radio button in the form
    this.RoleChange = this.RoleChange.bind(this);
    this.MeetingStatusChange = this.MeetingStatusChange.bind(this);
    this.PosterWeightageChange = this.PosterWeightageChange.bind(this);
  }
  componentDidMount() {
    this.setState({ groupData: this.props.groupData });
    console.log("Group data is :", this.props.groupData);
  }

  changeGroupName(values) {
    let val = values.target.value;
    this.setState({ GroupName: val });
    if (val === "") this.setState({ GroupNameInvalid: true });
    else this.setState({ GroupNameInvalid: false });
  }
  async handleSubmit(values) {
    // let tLoad = toast.loading(this.state.GroupName) ;
    // console.log("Selected Group is: ",this.state.GroupName);
    if (this.state.FormName == "FYP1-Dev-Mid"){
      
    }
    else if (this.state.FormName == "FYP1-R&D-Mid"){
      
    }
    else if (this.state.FormName == "FYP2-Dev-Mid"){
      
    }
    else if (this.state.FormName == "FYP2-R&D-Mid"){
      
    }
    else if (this.state.FormName == "FYP1-Dev-Final"){
      
    }
    else if (this.state.FormName == "FYP1-R&D-Final"){
      
    }
    else if (this.state.FormName == "FYP2-Dev-Final"){
      
    }
    else if (this.state.FormName == "FYP2-R&D-Final"){
      
    }
  }

  // Changing the value of radio button in the form
  RoleChange(event) {
    this.setState({
      SelectRole: event.target.value,
    });
  }
  MeetingStatusChange(event) {
    this.setState({
      SelectMeetingStatus: event.target.value,
    });
  }

  PosterWeightageChange(event) {
    this.setState({
      PosterWeightValue: event.target.value,
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
    let RoleRadioButton = [" Supervisor ", " Panel Member"];
    let MeetingStatusRadio = ["Regular", "Occasional", "Never"];
    let marks = [
      "0",
      "3",
      "3.5",
      "4",
      "4.5",
      "5",
      "5.5",
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
    ];
    let Quality_marks = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
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
                  <CardTitle tag="h5">Group Evaluation</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    {/* Choosing the FYP Group that are stored in  Database */}
                    <Row className="justify-content-center">
                      <Col className="pr-1" md="8">
                        <FormGroup>
                          <p className="h7">Select FYP Group</p>
                          <Input
                            type="select"
                            onChange={this.changeGroupName}
                            value={this.state.GroupName}
                            required
                          >
                            <option value="" disabled selected>
                              Select Group
                            </option>
                            {this.state.groupData.map((data, index) => {
                              return (
                                <option key={index} value={data._id}>
                                  {data.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

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

                        {/* <label>Choose Evaluation Form</label>
                        <br />
                        <div className="form-check form-check-inline">
                          <center>
                            {FormNameRadioButton.map((result) => (
                              <>
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  onChange={(e) =>
                                    this.setState({ FormName: e.target.value })
                                  }
                                  value={result}
                                  name="inlineRadioOptions"
                                  required
                                />
                                {result}
                              </>
                            ))}
                          </center>
                        </div> */}
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
                                    <label>
                                      Form for FYP-1 (D) Mid Term Evaluation
                                    </label>
                                    <br />
                                    <br />
                                    <p className="h7">FYP Title</p>
                                    <input
                                      type="text"
                                      id="defaultFormRegisterNameEx"
                                      className="form-control"
                                    />
                                    <br />
                                    <p className="h7">Evaluator's Role</p>
                                    <div className="radio">
                                      {/*<div
                                        className="form-check form-check-inline"
                                        pd="10"
                                      >
                                         {RoleRadioButton.map((result) => (
                                          <label>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={(e) =>
                                                this.setState({
                                                  SelectRole: e.target.value,
                                                })
                                              }
                                              value={result}
                                              name="inlineRadioOptions"
                                              required
                                            />
                                            {result}
                                          </label>
                                        ))}
                                      </div> */}
                                      <label>
                                        <input
                                          type="radio"
                                          value="Supervisor"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Supervisor
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Panel Member"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Panel Member
                                      </label>
                                    </div>
                                    <br />
                                    <p className="h7">
                                      Status of meeting (Only for Supervisor)
                                    </p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Regular"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Regular"
                                          }
                                          //onChange={this.MeetingStatusChange}
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Regular
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Occasional"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Occasional"
                                          }
                                          //onChange={this.MeetingStatusChange}
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Occasional
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Never"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Never"
                                          }
                                          //onChange={this.MeetingStatusChange}
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Never
                                      </label>
                                    </div>
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
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    {/* <p className="h7">
                                      FYP Poster Marks .
                                      <br />
                                      <select
                                        value={this.state.value}
                                        onChange={this.PosterWeightageChange}
                                        className="basic-single"
                                        classNamePrefix="select"
                                      >
                                        {marks.map((selectedMarks) => (
                                          <option
                                            key={selectedMarks}
                                            value={selectedMarks}
                                          >
                                            {selectedMarks}
                                          </option>
                                        ))}
                                      </select>
                                    </p> 
                                    <br /> */}
                                    {/* <select
                                      value={this.state.value}
                                      onChange={this.PosterWeightageChange}
                                    >
                                      <option value="0">0</option>
                                      <option value="3">3</option>
                                      <option value="3.5">3.5</option>
                                      <option value="4">4</option>
                                      <option value="4.5">4.5</option>
                                      <option value="5">5</option>
                                      <option value="5.5">5.5</option>
                                      <option value="6">6</option>
                                      <option value="6.5">6.5</option>
                                      <option value="7">7</option>
                                      <option value="7.5">7.5</option>
                                      <option value="8">8</option>
                                      <option value="8.5">8.5</option>
                                      <option value="9">9</option>
                                      <option value="9.5">9.5</option>
                                      <option value="10">10</option>
                                    </select> */}

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
                                            IterationsDefine_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    {/* <p className="h7">
                                      Iteration Definition, FYP Plan, Work
                                      Breakdown .
                                      <select
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsDefine_Marks:
                                              e.target.value,
                                          })
                                        }
                                      >
                                        {marks.map((selectedMarks) => (
                                          <option
                                            key={selectedMarks}
                                            value={selectedMarks}
                                          >
                                            {selectedMarks}
                                          </option>
                                        ))}
                                      </select>
                                    </p> */}

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
                                            IterationsCompletion_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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

                                    {/* <br />
                                    <p className="h7">
                                      Work complete for Iteration including
                                      design and implementation .
                                      <select
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IterationsCompletion_Marks:
                                              e.target.value,
                                          })
                                        }
                                      >
                                        {marks.map((selectedMarks) => (
                                          <option
                                            key={selectedMarks}
                                            value={selectedMarks}
                                          >
                                            {selectedMarks}
                                          </option>
                                        ))}
                                      </select>
                                    </p> */}

                                    <p className="h6">
                                      Quality of the presentation
                                    </p>
                                    <br />

                                    <FormGroup>
                                      <p className="h7">
                                        Slide Design and content Quality
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            SlideDesign_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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

                                    {/* 
                                    <p className="h7">
                                      Slide Design and content Quality
                                    </p>
                                    <div className="form-check form-check-inline">
                                      <center>
                                        {Quality_marks.map((Result1) => (
                                          <>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={(e) =>
                                                this.setState({
                                                  SlideDesign_Marks:
                                                    e.target.value,
                                                })
                                              }
                                              value={Result1}
                                              name="inlineRadioOptions"
                                              required
                                            />
                                            {Result1}
                                          </>
                                        ))}
                                      </center>
                                    </div> */}

                                    <FormGroup>
                                      <p className="h7">
                                        Style(Delivery, Confident, Clarity)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Style_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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

                                    {/* <p className="h7">
                                      Style(Delivery, Confident, Clarity)
                                    </p>
                                    <div className="form-check form-check-inline">
                                      <center>
                                        {Quality_marks.map((Result2) => (
                                          <>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={(e) =>
                                                this.setState({
                                                  Style_Marks: e.target.value,
                                                })
                                              }
                                              value={Result2}
                                              name="inlineRadioOptions"
                                              required
                                            />
                                            {Result2}
                                          </>
                                        ))}
                                      </center>
                                    </div> */}

                                    <FormGroup>
                                      <p className="h7">
                                        Handling of the Questions
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            QuestionHadling_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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

                                    {/* <p className="h7">
                                      Handling of the Questions
                                    </p>
                                    <div className="form-check form-check-inline">
                                      <center>
                                        {Quality_marks.map((SelectResult) => (
                                          <>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={(e) =>
                                                this.setState({
                                                  QuestionHadling_Marks:
                                                    e.target.value,
                                                })
                                              }
                                              value={SelectResult}
                                              name="inlineRadioOptions"
                                              required
                                            />
                                            {SelectResult}
                                          </>
                                        ))}
                                      </center>
                                    </div> */}

                                    <FormGroup>
                                      <p className="h7">
                                        Timing of the Presentation
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentTime_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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

                                    {/* <p className="h7">
                                      Timing of the Presentation
                                    </p>
                                    <div className="form-check form-check-inline">
                                      <center>
                                        {Quality_marks.map((SelectResult) => (
                                          <>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={(e) =>
                                                this.setState({
                                                  PresentTime_Marks:
                                                    e.target.value,
                                                })
                                              }
                                              value={SelectResult}
                                              name="inlineRadioOptions"
                                              required
                                            />
                                            {SelectResult}
                                          </>
                                        ))}
                                      </center>
                                    </div>
                                     */}

                                    <FormGroup>
                                      <p className="h7">
                                        Team Dynamics (Coordination)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            TeamDynamics_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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

                                    {/*
                                    <p className="h7">
                                      Team Dynamics (Coordination)
                                    </p>
                                    <div className="form-check form-check-inline">
                                      <center>
                                        {Quality_marks.map((SelectResult) => (
                                          <>
                                            <input
                                              class="form-check-input"
                                              type="radio"
                                              onChange={(e) =>
                                                this.setState({
                                                  TeamDynamics_Marks:
                                                    e.target.value,
                                                })
                                              }
                                              value={SelectResult}
                                              name="inlineRadioOptions"
                                              required
                                            />
                                            {SelectResult}
                                          </>
                                        ))}
                                      </center>
                                    </div> */}

                                    <br />
                                    <br />
                                    <p className="h6">
                                      Comments and Suggestions
                                    </p>
                                    <br />
                                    <p className="h7">
                                      Justtification for your evaluation.
                                      (Comments and Suggestions for group)
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Evaluation_Justification:
                                            e.target.value,
                                        })
                                      }
                                    />
                                    <br />
                                    <br />
                                    <p className="h7">
                                      Any comments for FYP committee.
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Teachers_Comments: e.target.value,
                                        })
                                      }
                                    />
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

                                    <label>
                                      Form for FYP-1 (R&D) Mid Term Evaluation
                                    </label>
                                    <br />
                                    <br />
                                    <p className="h7">FYP Title</p>
                                    <input
                                      type="text"
                                      id="defaultFormRegisterNameEx"
                                      className="form-control"
                                    />
                                    <br />
                                    <p className="h7">Evaluator's Role</p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Supervisor"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Supervisor
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Panel Member"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Panel Member
                                      </label>
                                    </div>
                                    <br />
                                    <p className="h7">
                                      Status of meeting (Only for Supervisor)
                                    </p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Regular"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Regular"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Regular
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Occasional"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Occasional"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Occasional
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Never"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Never"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Never
                                      </label>
                                    </div>
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
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            IterationsDefine_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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

                                    <p className="h6">
                                      Quality of Research work
                                    </p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Introduction of problem domain and the
                                        research problem statement
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            IntroToProblem_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Literature survey of at least 5 research
                                        items{" "}
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Literature_Survey_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Synthesis of Literature/Relevance to own
                                        work
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Synthesis_of_Literature_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                      <p className="h7">Proposed approach</p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Proposed_approach_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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

                                    <p className="h6">
                                      Quality of the presentation
                                    </p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Slide Design and content Quality
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            SlideDesign_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Style(Delivery, Confident, Clarity)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Style_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Handling of the Questions
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            QuestionHadling_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Timing of the Presentation
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentTime_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Team Dynamics (Coordination)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            TeamDynamics_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                    <p className="h6">
                                      Comments and Suggestions
                                    </p>
                                    <br />
                                    <p className="h7">
                                      Justtification for your evaluation.
                                      (Comments and Suggestions for group)
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Evaluation_Justification:
                                            e.target.value,
                                        })
                                      }
                                    />
                                    <br />
                                    <br />
                                    <p className="h7">
                                      Any comments for FYP committee.
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Teachers_Comments: e.target.value,
                                        })
                                      }
                                    />
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

                                    <label>
                                    Form for FYP-2 Mid Term (commonly known as Pre-Job Fair) Evaluation. <br />
                                    Following guidelines were shared with the students in order to prepare them for the preparation and guide them towards the expectations. <br />
                                    The job fair is one of the most important events during your BS degree. Industry experts visit the university to initiate their hiring process. Hence, the pre-job fair evaluation will be rigorous to ensure that the students present the highest quality FYPs to the industry.<br />
                                    It is expected that the FYPs that pass the evaluation have completed all the required milestones.To further emphasize the high quality, it is decided that all FYPs that go into the re-evaluation will have a 10% deduction in their pre-job fair evaluation marks.<br />
                                    It is also observed that some groups had one or even two freeloader members. FYP committee has asked the panel members to identify and report such members for individual grading. For more clarity, all groups are required to create Git repositories and all members shall contribute regularly in it. The panel members will see the contributions in the Git repository for individual grading.<br />
                                    </label>
                                    <br />
                                    <br />
                                    <p className="h7">FYP Title</p>
                                    <input
                                      type="text"
                                      id="defaultFormRegisterNameEx"
                                      className="form-control"
                                    />
                                    <br />
                                    <p className="h7">Evaluator's Role</p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Supervisor"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Supervisor
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Panel Member"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Panel Member
                                      </label>
                                    </div>
                                    
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
                                            Implemention_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            ProjectImpression_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            CodeQuality_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            CodeIntegration_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                    Recommendation
                                    </p>
                                    <br />
                                    <p className="h7">
                                    Recommended improvements in case the progress is not suitable. *
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Recomm_improvements:
                                            e.target.value,
                                        })
                                      }
                                    />
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

                                    <label>
                                    Form for FYP-2 Mid Term (commonly known as Pre-Job Fair) Evaluation. <br />
                                    Following guidelines were shared with the students in order to prepare them for the preparation and guide them towards the expectations. <br />
                                    The job fair is one of the most important events during your BS degree. Industry experts visit the university to initiate their hiring process. Hence, the pre-job fair evaluation will be rigorous to ensure that the students present the highest quality FYPs to the industry.<br />
                                    It is expected that the FYPs that pass the evaluation have completed all the required milestones.To further emphasize the high quality, it is decided that all FYPs that go into the re-evaluation will have a 10% deduction in their pre-job fair evaluation marks.<br />
                                    Usually, failing R&D-Based FYPs have the following issues:<br />
                                    i) Not finalizing and reporting the methodology<br />
                                    ii) Not choosing the valid metrics<br />
                                    iii) Not reporting adequate results<br />
                                    iv) Not comparing their results with the current literature<br />
                                    v) Not having an impressive presentation<br />
                                    vi) Not having a quality poster<br />
                                    <br />
                                    It is also observed that some groups had one or even two freeloader members. FYP committee has asked the panel members to identify and report such members for individual grading. For more clarity, all groups are required to create Git repositories and all members shall contribute regularly in it. The panel members will see the contributions in the Git repository for individual grading.<br />
                                    </label>
                                    <br />
                                    <br />
                                    <p className="h7">FYP Title</p>
                                    <input
                                      type="text"
                                      id="defaultFormRegisterNameEx"
                                      className="form-control"
                                    />
                                    <br />
                                    <p className="h7">Evaluator's Role</p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Supervisor"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Supervisor
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Panel Member"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Panel Member
                                      </label>
                                    </div>
                                    
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
                                            Implemention_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            Preliminary_Outcomes:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            Work_suitable:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    Recommendation
                                    </p>
                                    <br />
                                    <p className="h7">
                                    Recommended improvements in case the progress is not suitable for the Job Fair! *
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Recomm_improvements:
                                            e.target.value,
                                        })
                                      }
                                    />
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

                                    <label>
                                      Form for FYP-1 (D) Final Term Evaluation
                                    </label>
                                    <br />
                                    <br />
                                    <p className="h7">FYP Title</p>
                                    <input
                                      type="text"
                                      id="defaultFormRegisterNameEx"
                                      className="form-control"
                                    />
                                    <br />
                                    <p className="h7">Evaluator's Role</p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Supervisor"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Supervisor
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Panel Member"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Panel Member
                                      </label>
                                    </div>
                                    <br />
                                    <p className="h7">
                                      Status of meeting (Only for Supervisor)
                                    </p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Regular"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Regular"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Regular
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Occasional"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Occasional"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Occasional
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Never"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Never"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Never
                                      </label>
                                    </div>
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
                                            IterationsDefine_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    <p className="h6">
                                      Quality of the presentation
                                    </p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Slide Design and content Quality
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            SlideDesign_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Style(Delivery, Confident, Clarity)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Style_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Handling of the Questions
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            QuestionHadling_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Timing of the Presentation
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentTime_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Team Dynamics (Coordination)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            TeamDynamics_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                            Implemention_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            ProjectImpression_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            Demo_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    <p className="h6">
                                      Comments and Suggestions
                                    </p>
                                    <br />
                                    <p className="h7">
                                      Justtification for your evaluation.
                                      (Comments and Suggestions for group)
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Evaluation_Justification:
                                            e.target.value,
                                        })
                                      }
                                    />
                                    <br />
                                    <br />
                                    <p className="h7">
                                      Any comments for FYP committee.
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Teachers_Comments: e.target.value,
                                        })
                                      }
                                    />
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

                                    <label>
                                      Form for FYP-1 (R&D) Final Term Evaluation
                                    </label>
                                    <br />
                                    <br />
                                    <p className="h7">FYP Title</p>
                                    <input
                                      type="text"
                                      id="defaultFormRegisterNameEx"
                                      className="form-control"
                                    />
                                    <br />
                                    <p className="h7">Evaluator's Role</p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Supervisor"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Supervisor
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Panel Member"
                                          name="radioValues"
                                          onChange={this.RoleChange}
                                        />
                                        Panel Member
                                      </label>
                                    </div>
                                    <br />
                                    <p className="h7">
                                      Status of meeting (Only for Supervisor)
                                    </p>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Regular"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Regular"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Regular
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Occasional"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Occasional"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Occasional
                                      </label>
                                    </div>
                                    <div className="radio">
                                      <label>
                                        <input
                                          type="radio"
                                          value="Never"
                                          checked={
                                            this.state.SelectMeetingStatus ===
                                            "Never"
                                          }
                                          onChange={(e) =>
                                            this.setState({
                                              SelectMeetingStatus:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        Never
                                      </label>
                                    </div>
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
                                            IterationsDefine_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    <p className="h6">
                                      Quality of the presentation
                                    </p>
                                    <br />
                                    <FormGroup>
                                      <p className="h7">
                                        Slide Design and content Quality
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            SlideDesign_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Style(Delivery, Confident, Clarity)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Style_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Handling of the Questions
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            QuestionHadling_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Timing of the Presentation
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            PresentTime_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Team Dynamics (Coordination)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            TeamDynamics_Marks: e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {Quality_marks.map((data, index) => {
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
                                        Implementation (Should be atleast 45%)
                                      </p>
                                      <Input
                                        type="select"
                                        value={this.state.value}
                                        onChange={(e) =>
                                          this.setState({
                                            Implemention_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                            ProjectImpression_Marks:
                                              e.target.value,
                                          })
                                        }
                                        required
                                      >
                                        <option value="" disabled selected>
                                          Select Marks
                                        </option>
                                        {marks.map((data, index) => {
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
                                    <p className="h6">
                                      Comments and Suggestions
                                    </p>
                                    <br />
                                    <p className="h7">
                                      Justtification for your evaluation.
                                      (Comments and Suggestions for group)
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Evaluation_Justification:
                                            e.target.value,
                                        })
                                      }
                                    />
                                    <br />
                                    <br />
                                    <p className="h7">
                                      Any comments for FYP committee.
                                    </p>
                                    <TextField
                                      type="text"
                                      value={this.state.value}
                                      label="Your Answer"
                                      onChange={(e) =>
                                        this.setState({
                                          Teachers_Comments: e.target.value,
                                        })
                                      }
                                    />
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
