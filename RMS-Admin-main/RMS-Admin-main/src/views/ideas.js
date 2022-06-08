import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Redirect } from "react-router-dom";
import isAuthenticated from "../auth/index";
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

class Idea extends React.Component {
  constructor(props) {
    super(props);
    // var showdate = new Date();                                                           // this is for showing date
    // var displaydate = showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
    // var dt = showdate.toDateString();
    this.state = {
      ideasData: [],
      GivenBY: "",
      // Title: "",
      details: "",
      // Type: "",
      Tooluse: "",
      knowledge: "",
      InvalidLength: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changedetails = this.changedetails.bind(this);
    this.IdeaGivenBy = this.IdeaGivenBy.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deletesubmit = this.deletesubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ ideasData: this.props.ideasData });
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
  IdeaGivenBy(values) {
    this.setState({ GivenBY: values.target.value });
  }

  async handleSubmit(values) {
    let tLoad = toast.loading("Adding New Ideas");
    values.preventDefault();
    if (this.state.GivenBY !== "" && this.state.Tooluse !== "") {
      await this.props.postingIdeas(
        this.state.GivenBY,
        // this.state.Title,
        this.state.details,
        // this.state.Type,
        this.state.Tooluse,
        this.state.knowledge
      );
      this.setState({ ideasData: this.props.ideasData });
      this.setState({
        GivenBY: "",
        // Title: "",
        details: "",
        // Type: "",
        Tooluse: "",
        knowledge: "",
      });

      toast.dismiss(tLoad);
      toast.success("New Idea Added");
    }
  }
  async handleDelete(data) {
    let tLoad = toast.loading("Deleting Idea");
    await this.props.deletingIdeas(data._id);
    this.setState({ ideasData: this.props.ideasData });
    toast.dismiss(tLoad);
    toast.success("Idea Deleted");
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
                  <CardTitle tag="h5">Give an Idea</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Idea Given by</label>
                          <Input
                            placeholder="Teacher Name"
                            type="text"
                            onChange={this.IdeaGivenBy}
                            value={this.state.GivenBY}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>FYP Title</label>
                          <Input
                            placeholder="Title"
                            type="text"
                            value={this.state.value}
                            onChange={(e) =>
                              this.setState({
                                Title: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
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
                    {/* <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Project Type</label>
                          <Input
                            placeholder="Type"
                            type="text"
                            value={this.state.value}
                            onChange={(e) =>
                              this.setState({
                                Type: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}

                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Tool/Technologies</label>
                          <Input
                            placeholder="Tools"
                            type="text"
                            value={this.state.value}
                            onChange={(e) =>
                              this.setState({
                                Tooluse: e.target.value,
                              })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Preferred Skills/course</label>
                          <Input
                            placeholder="Skills/course"
                            type="text"
                            value={this.state.value}
                            onChange={(e) =>
                              this.setState({
                                knowledge: e.target.value,
                              })
                            }
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
                  <CardTitle tag="h4">FYP Ideas</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Given by</th>
                        {/* <th>FYP Title</th> */}
                        <th>Description</th>
                        {/* <th>Project Type</th> */}
                        <th>Tool/Technologies</th>
                        <th>Preferred Skills/course</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ideasData.map((record) => {
                        return (
                          <>
                            <tr>
                              <td>{record.GivenBY}</td>
                              {/* <td>{record.Title}</td> */}
                              <td>{record.details}</td>
                              {/* <td>{record.Type}</td> */}
                              <td>{record.Tooluse}</td>
                              <td>{record.knowledge}</td>
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
        </div>
      </>
    );
  }
}

export default Idea;
