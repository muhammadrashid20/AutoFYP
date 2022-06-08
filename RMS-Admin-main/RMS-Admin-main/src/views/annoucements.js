import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Redirect } from "react-router-dom";
import isAuthenticated from "../auth/index";
import emailjs from "@emailjs/browser";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

class Annoucement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AnnoucData: [],
      StudentData: [],
      AnnoucementFor: "",
      Title: "",
      details: "",

      fullName: "",
      UserEmail: "",
      User_message: "",
      InvalidLength: false,
      emails: ["i180535@nu.edu.pk", "i180704@nu.edu.pk ", "i180601@nu.edu.pk"],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changedetails = this.changedetails.bind(this);
    this.changeAnnoucementFor = this.changeAnnoucementFor.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
  }
  componentDidMount() {
    this.setState({
      AnnoucData: this.props.AnnoucData,
      StudentData: this.props.StudentData,
    });
    // console.log("students are ", this.props.StudentData);
  }
  //Validation
  changedetails(values) {
    var name = values.target.value;
    if (name.length < 3 || name.length > 500) {
      this.setState({ InvalidLength: true });
    } else {
      this.setState({ InvalidLength: false });
    }
    this.setState({ details: values.target.value });
  }
  changeAnnoucementFor(values) {
    this.setState({ AnnoucementFor: values.target.value });
  }
  changeTitle(values) {
    this.setState({ Title: values.target.value });
  }

  async handleSubmit(values) {
    let tLoad = toast.loading("Adding New Annoucements");
    values.preventDefault();
    if (
      this.state.InvalidLength === false &&
      this.state.AnnoucementFor !== "" &&
      this.state.Title !== ""
    ) {
      await this.props.postingAnnoucements(
        this.state.AnnoucementFor,
        this.state.Title,
        this.state.details
      );
      this.setState({ AnnoucData: this.props.AnnoucData });
      this.setState({
        details: "",
        Title: "",
        AnnoucementFor: "",
      });
      toast.dismiss(tLoad);
      toast.success("New Annoucement Added");
    }
  }
  async handleDelete(data) {
    let tLoad = toast.loading("Deleting Annoucement");
    await this.props.deletingAnnoucements(data._id);
    this.setState({ AnnoucData: this.props.AnnoucData });
    toast.dismiss(tLoad);
    toast.success("Annoucement Deleted");
  }

  async deletesubmit(data) {
    confirmAlert({
      title: "Deletion Alert",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleDelete(data),
        },
        {
          label: "No",
          // onClick: () => alert('Click No')
        },
      ],
    });
  }

  // (function () {
  //   emailjs.init("hOcdQ_YArPNPEPPGv");
  // })();

  async handleSendMail(values) {
    let tLoad = toast.loading("Sending Mail");
    values.preventDefault();
    if (
      this.state.fullName !== "" &&
      this.state.UserEmail !== "" &&
      this.state.User_message !== ""
    ) {
      // console.log(this.state.fullName, this.state.UserEmail);
      if ( this.state.UserEmail === "Students"){
      this.state.StudentData.map((record) => {
        this.state.emails = record.email;

        var contactParams = {
          from_name: this.state.fullName,
          to_email: this.state.emails,
          message: this.state.User_message,
        };
        emailjs.send(
          "service_vmz5jxw",
          "template_qjkbsl7",
          contactParams,
          "hOcdQ_YArPNPEPPGv"
        );
        this.setState({
          fullName: "",
          UserEmail: "",
          User_message: "",
        });
      });
      }
      else {
        var contactParams = {
          from_name: this.state.fullName,
          to_email: this.state.UserEmail,
          message: this.state.User_message,
        };
        emailjs.send(
          "service_vmz5jxw",
          "template_qjkbsl7",
          contactParams,
          "hOcdQ_YArPNPEPPGv"
        );
        this.setState({
          fullName: "",
          UserEmail: "",
          User_message: "",
        });
      }
      toast.dismiss(tLoad);
      toast.success("Email send");
    }
  }

  render() {
    return (
      <>
        <div className="content">
          {!isAuthenticated(sessionStorage.getItem("HMS-Admin")) ? (
            <Redirect to="/admin/login" />
          ) : (
            <></>
          )}
          <Row>
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Make Annoucements</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Annoucement For</label>
                          <Input
                            type="select"
                            onChange={this.changeAnnoucementFor}
                            value={this.state.AnnoucementFor}
                            required
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="Students">Students</option>
                            <option value="Teachers">Teachers</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            placeholder="Title"
                            type="text"
                            onChange={this.changeTitle}
                            value={this.state.Title}
                            invalid={this.state.InvalidLength}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Details</label>
                          <Input
                            placeholder="Details"
                            type="text"
                            onChange={this.changedetails}
                            value={this.state.details}
                            invalid={this.state.InvalidLength}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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

                      {/* emailjs ka send wala fuction call ho ga  */}
                      {/* <button onClick="sendmail()" type="button" class="btn btn-primary"> Send Annoucement</button> */}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Annoucements</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Annoucement For</th>
                        <th>Title</th>
                        <th>Details</th>

                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.AnnoucData.map((record) => {
                        return (
                          <>
                            <tr>
                              <td>{record.AnnoucementFor}</td>
                              <td>{record.Title}</td>
                              <td>{record.details}</td>

                              <td>
                                <Button
                                  color="danger"
                                  onClick={() => this.deletesubmit(record)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Send Mail</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSendMail(values)}>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Full Name</label>
                          <Input
                            type="text"
                            onChange={(e) =>
                              this.setState({ fullName: e.target.value })
                            }
                            value={this.state.fullName}
                            required
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Email to</label>
                          {/* <Input
                            type="email"
                            onChange={(e) =>
                              this.setState({ UserEmail: e.target.value })
                            }
                            value={this.state.UserEmail}
                            required
                          ></Input> */}

                          <Input
                            type="select"
                            onChange={(e) =>
                              this.setState({ UserEmail: e.target.value })
                            }
                            value={this.state.UserEmail}
                            required
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="Students">Students</option>
                            <option value="Individual">Individual</option>
                          </Input>
                          <div>
                            {
                            this.state.UserEmail == "Individual" ? (
                              <div>
                                <label>Email address</label>
                                <Input
                                  type="email"
                                  onChange={(e) =>
                                    this.setState({ UserEmail: e.target.value })
                                  }
                                  value={this.state.UserEmail}
                                  required
                                ></Input>
                              </div>
                              ): null
                            }
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Message</label>
                          <Input
                            type="text"
                            onChange={(e) =>
                              this.setState({ User_message: e.target.value })
                            }
                            value={this.state.User_message}
                            required
                          ></Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Send Mail
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        {/* <div>
          <form>
            <div class="form-group">
              <label for="fname">Full Name :</label>
              <input
                class="form-control"
                type="text"
                id="Sender_name"
                name="fullname"
                placeholder="Your full name..."
              ></input>

              <label for="email">Email :</label>
              <input
                class="form-control"
                type="text"
                id="email"
                name="email"
                placeholder="Your email..."
              ></input>

              <label for="message">Message :</label>
              <textarea
                class="form-control textarea"
                id="message"
                rows="3"
                placeholder="Your message..."
              ></textarea>

              <button
                onClick={(e) => this.sendMail}
                type="button"
                class="btn btn-primary"
              >
                Send
              </button>
            </div>
          </form>
        </div> */}
      </>
    );
  }
}

export default Annoucement;
