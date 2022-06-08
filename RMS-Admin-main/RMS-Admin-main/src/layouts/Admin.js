import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { WindMillLoading } from "react-loadingg";
import isAuthenticated from "../auth/index";
var axios = require("axios");

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelData: [],
      supervisorData: [],
      StudentData: [],
      groupData: [],
      allotmentData: [],
      rentData: [],
      visitorData: [],
      expenseData: [],
      AnnoucData: [],
      ideasData: [],
      loading: false,
      loginResponse: {},
    };
    this.mainPanel = React.createRef();
    this.login = this.login.bind(this);
    this.gettingResources = this.gettingResources.bind(this);
    this.gettingpanels = this.gettingpanels.bind(this);
    this.postingpanels = this.postingpanels.bind(this);
    this.deletingpanel = this.deletingpanel.bind(this);

    this.gettingsupervisors = this.gettingsupervisors.bind(this);
    this.postingsupervisors = this.postingsupervisors.bind(this);
    this.deletingsupervisor = this.deletingsupervisor.bind(this);

    this.gettingStudent = this.gettingStudent.bind(this);
    this.postingStudent = this.postingStudent.bind(this);
    this.updatingStudent = this.updatingStudent.bind(this);
    this.deletingStudent = this.deletingStudent.bind(this);

    this.gettinggroups = this.gettinggroups.bind(this);
    this.postinggroup = this.postinggroup.bind(this);
    this.deletinggroup = this.deletinggroup.bind(this);

    // this.gettingAllotments = this.gettingAllotments.bind(this) ;
    // this.postingAllotment = this.postingAllotment.bind(this) ;
    // this.deletingAllotment = this.deletingAllotment.bind(this);

    // this.gettingRent = this.gettingRent.bind(this) ;
    // this.postingRent = this.postingRent.bind(this);
    // this.deletingRent = this.deletingRent.bind(this);

    // this.gettingVisitor = this.gettingVisitor.bind(this) ;
    // this.postingVisitor = this.postingVisitor.bind(this);
    // this.deletingVisitor = this.deletingVisitor.bind(this);

    // this.gettingExpense = this.gettingExpense.bind(this) ;
    // this.postingExpense = this.postingExpense.bind(this);
    // this.deletingExpense = this.deletingExpense.bind(this);

    this.gettingAnnoucements = this.gettingAnnoucements.bind(this);
    this.postingAnnoucements = this.postingAnnoucements.bind(this);
    this.deletingAnnoucements = this.deletingAnnoucements.bind(this);

    this.gettingIdeas = this.gettingIdeas.bind(this);
    this.postingIdeas = this.postingIdeas.bind(this);
    this.deletingIdeas = this.deletingIdeas.bind(this);
  }
  componentDidMount() {
    if (
      navigator.platform.indexOf("Win") > -1 &&
      this.state.loading === false
    ) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    this.gettingResources();
  }
  componentWillUnmount() {
    if (
      navigator.platform.indexOf("Win") > -1 &&
      this.state.loading === false
    ) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH" && this.state.loading === false) {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  async login(email, password) {
    console.log("Logging - IN");
    var header = {
      email: email,
      password: password,
    };
    var response = await axios.post(
      "http://localhost:3500/admin/login",
      header,
      { withCredentials: true }
    );
    if (response.data.message === "Admin logged in successfully") {
      sessionStorage.setItem("HMS-Admin", response.data.token);
      this.gettingResources();
    }
    this.setState({ loginResponse: response.data });
    console.log(response);
  }
  async deletingpanel(id) {
    console.log("Deleting panels");
    try {
      var response = await axios.delete("http://localhost:3500/panel/" + id, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingpanels();
  }
  async postingpanels(name) {
    console.log("Posting panels");
    try {
      var header = {
        name: name,
      };
      var response = await axios.post("http://localhost:3500/panel", header, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }
  async gettingpanels() {
    console.log("Getting panels");
    try {
      var response = await axios.get("http://localhost:3500/panel", {
        withCredentials: true,
      });
      console.log(response);
      this.setState({ panelData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }
  //supervisors
  async deletingsupervisor(id) {
    console.log("Deleting supervisors");
    try {
      var response = await axios.delete(
        "http://localhost:3500/supervisor/" + id,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingsupervisors();
    await this.gettingpanels();
  }
  async postingsupervisors(name, id) {
    console.log(id);
    console.log("Posting supervisors");
    try {
      var header = {
        name: name,
        panelId: id,
      };
      var response = await axios.post(
        "http://localhost:3500/supervisor",
        header,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // await this.gettingResources() ;
  }
  async gettingsupervisors() {
    console.log("Getting supervisors");
    try {
      var response = await axios.get("http://localhost:3500/supervisor", {
        withCredentials: true,
      });
      console.log(response);
      this.setState({ supervisorData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }
  // Student
  async deletingStudent(id) {
    console.log("Deleting Student");
    try {
      var response = await axios.delete("http://localhost:3500/Student/" + id, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingStudent();
  }
  async postingStudent(student, options) {
    console.log("Posting Student");
    try {
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('photo', photo);
      // formData.append('password', password);
      // formData.append('fatherName', fatherName);
      // formData.append('address', address);
      // formData.append('city', city);
      // formData.append('state', state);
      // formData.append('country', country);
      // formData.append('contactNumber', contactNumber);
      // formData.append('email', email);
      // formData.append('fatherContactNumber', fatherContactNumber);
      // formData.append('occupation', occupation);
      // formData.append('guardianName', guardianName);
      // formData.append('guardianRelation', guardianRelation);
      // formData.append('guardianContactNumber', guardianContactNumber);
      // formData.append('bloodGroup', bloodGroup);
      var header = {
        student:student
      };
      var response = await axios.post("http://localhost:3500/Student", header,options, { withCredentials: true, });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingStudent();
  }
  async updatingStudent(id, name, email) {
    console.log("Updating Student");
    try {
      var header = {
        name: name,
        email: email,
      };
      var response = await axios.put(
        "http://localhost:3500/Student/" + id,
        header,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingStudent();
  }
  async gettingStudent() {
    console.log("Getting Student");
    try {
      var response = await axios.get("http://localhost:3500/Student", {
        withCredentials: true,
      });
      console.log(response);
      this.setState({ StudentData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }
  // groups
  async deletinggroup(id) {
    console.log("Deleting group");
    try {
      var response = await axios.delete("http://localhost:3500/group/" + id, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }
  async postinggroup(cupboard, sideTable, id, name) {
    console.log(id);
    console.log("Posting groups");
    try {
      var header = {
        sideTable: sideTable,
        cupboard: cupboard,
        supervisorId: id,
        name: name,
      };
      var response = await axios.post("http://localhost:3500/group", header, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }
  async gettinggroups() {
    console.log("Getting supervisors");
    try {
      var response = await axios.get("http://localhost:3500/group", {
        withCredentials: true,
      });
      console.log(response);
      this.setState({ groupData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }
  // Allotment
  // async deletingAllotment(id) {
  //   console.log("Deleting Allotment");
  //   try {
  //     var response = await axios.delete("http://localhost:3500/allotment/" + id , {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources();
  // }
  // async postingAllotment(studentId, groupId, securityDeposit, registeraitonCharges, monthlyRent) {
  //   console.log("Posting Allotment");
  //   try {
  //     var header = {
  //       studentId: studentId,
  //       groupId: groupId,
  //       securityDeposit: securityDeposit,
  //       registerationCharges: registeraitonCharges,
  //       monthlyRent: monthlyRent,
  //     }
  //     var response = await axios.post("http://localhost:3500/allotment", header, {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources() ;
  // }
  // async gettingAllotments() {
  //   console.log("Getting Allotments");
  //   try {
  //     var response = await axios.get("http://localhost:3500/allotment", {withCredentials: true}) ;
  //     console.log(response) ;
  //     this.setState({allotmentData: response.data.data});
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }

  // }
  // Rent Receipts
  // async deletingRent(id) {
  //   console.log("Deleting Rent Receipt");
  //   try {
  //     var response = await axios.delete("http://localhost:3500/rentreceipts/" + id, {withCredentials: true} ) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources();
  // }
  // async postingRent(StudentId, rentMonth, natureOfPayment, amount, modeOfPayment, receivingPerson) {
  //   console.log("Posting Rent");
  //   try {
  //     var header = {
  //       StudentId: StudentId,
  //       rentMonth: rentMonth,
  //       natureOfPayment: natureOfPayment,
  //       amount: amount,
  //       modeOfPayment: modeOfPayment,
  //       receivingPerson: receivingPerson
  //     }
  //     var response = await axios.post("http://localhost:3500/rentreceipts", header, {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources() ;
  // }
  // async gettingRent() {
  //   console.log("Getting REnt");
  //   try {
  //     var response = await axios.get("http://localhost:3500/rentreceipts", {withCredentials: true}) ;
  //     console.log(response) ;
  //     this.setState({rentData: response.data.data});
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }

  // }
  // Visitor Log
  // async deletingVisitor(id) {
  //   console.log("Deleting Visitor Log");
  //   try {
  //     var response = await axios.delete("http://localhost:3500/visitorLog/" + id , {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources();
  // }
  // async postingVisitor(visitorName, occupation, organization, cellNo, noOfgroupsAsked, affordingCapacity, expectedDateOfArrival, self) {
  //   console.log("Posting Visitor Log");
  //   try {
  //     var header = {
  //       visitorName: visitorName,
  //       occupation: occupation,
  //       organization: organization,
  //       cellNo: cellNo,
  //       noOfgroupsAsked: noOfgroupsAsked,
  //       affordingCapacity: affordingCapacity,
  //       edo: expectedDateOfArrival,
  //       self: self
  //     }
  //     var response = await axios.post("http://localhost:3500/visitorLog", header, {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources() ;
  // }
  // async gettingVisitor() {
  //   console.log("Getting Visitor Log");
  //   try {
  //     var response = await axios.get("http://localhost:3500/visitorLog", {withCredentials: true}) ;
  //     console.log(response) ;
  //     this.setState({visitorData: response.data.data});
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }

  // }

  // Annoucement
  async deletingAnnoucements(id) {
    console.log("Deleting annoucement");
    try {
      var response = await axios.delete(
        "http://localhost:3500/annoucements/" + id,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }
  async postingAnnoucements(AnnoucementFor, Title, details) {
    console.log("Posting annoucement");
    try {
      var header = {
        AnnoucementFor: AnnoucementFor,
        Title: Title,
        details: details,
      };
      var response = await axios.post(
        "http://localhost:3500/annoucements",
        header,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }
  async gettingAnnoucements() {
    console.log("Getting Annoucements");
    try {
      var response = await axios.get("http://localhost:3500/annoucements", {
        withCredentials: true,
      });
      console.log(response);
      this.setState({ AnnoucData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  // Ideas
  async deletingIdeas(id) {
    console.log("Deleting idea");
    try {
      var response = await axios.delete("http://localhost:3500/ideas/" + id, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }
  async postingIdeas(GivenBY, details, Tooluse, knowledge) {
    console.log("Posting ideas");
    try {
      var header = {
        GivenBY: GivenBY,
        details: details,
        Tooluse: Tooluse,
        knowledge: knowledge,
      };
      var response = await axios.post("http://localhost:3500/ideas", header, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    await this.gettingResources();
  }

  async gettingIdeas() {
    console.log("Getting ideas");
    try {
      var response = await axios.get("http://localhost:3500/ideas", {
        withCredentials: true,
      });
      console.log(response);
      this.setState({ ideasData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  // Expense
  // async deletingExpense(id) {
  //   console.log("DeletingExpense");
  //   try {
  //     var response = await axios.delete("http://localhost:3500/expense/" + id , {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources();
  // }
  // async postingExpense(name, category, amount) {
  //   console.log("Posting Expense");
  //   try {
  //     var header = {
  //       name: name,
  //       category: category,
  //       amount: amount
  //     }
  //     var response = await axios.post("http://localhost:3500/expense", header, {withCredentials: true}) ;
  //     console.log(response) ;
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }
  //   await this.gettingResources() ;
  // }
  // async gettingExpense() {
  //   console.log("Getting Expenses");
  //   try {
  //     var response = await axios.get("http://localhost:3500/expense", {withCredentials: true}) ;
  //     console.log(response) ;
  //     this.setState({expenseData: response.data.data});
  //   }
  //   catch(error) {
  //     console.log(error) ;
  //   }

  // }
  async gettingResources() {
    if (isAuthenticated(sessionStorage.getItem("HMS-Admin"))) {
      this.setState({ loading: true });
      await this.gettingpanels();
      await this.gettingsupervisors();
      await this.gettingStudent();
      await this.gettinggroups();
      // await this.gettingAllotments() ;
      // await this.gettingRent();
      // await this.gettingVisitor();
      // await this.gettingExpense();
      await this.gettingAnnoucements();
      await this.gettingIdeas();
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <>
        {this.state.loading === true ? (
          <WindMillLoading size="large" />
        ) : (
          <div className="wrapper">
            <Sidebar
              {...this.props}
              routes={routes}
              bgColor={this.state.backgroundColor}
              activeColor={this.state.activeColor}
            />
            <div className="main-panel" ref={this.mainPanel}>
              <DemoNavbar {...this.props} />
              <Switch>
                {routes.map((prop, key) => {
                  let Comp = prop.component;
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      //component={prop.component}
                      key={key}
                      render={(props) => (
                        <Comp
                          {...props}
                          login={this.login}
                          loginResponse={this.state.loginResponse}
                          gettingResources={this.gettingResources}
                          panelData={this.state.panelData}
                          gettingpanels={this.gettingpanels}
                          postingpanels={this.postingpanels}
                          deletingpanel={this.deletingpanel}
                          supervisorData={this.state.supervisorData}
                          gettingsupervisors={this.gettingsupervisors}
                          postingsupervisors={this.postingsupervisors}
                          deletingsupervisor={this.deletingsupervisor}
                          StudentData={this.state.StudentData}
                          gettingStudent={this.gettingStudent}
                          postingStudent={this.postingStudent}
                          updatingStudent={this.updatingStudent}
                          deletingStudent={this.deletingStudent}
                          groupData={this.state.groupData}
                          gettinggroups={this.gettinggroups}
                          postinggroup={this.postinggroup}
                          deletinggroup={this.deletinggroup}
                          // allotmentData = {this.state.allotmentData}
                          // gettingAllotments = {this.gettingAllotments}
                          // postingAllotment = {this.postingAllotment}
                          // deletingAllotment = {this.deletingAllotment}

                          // rentData = {this.state.rentData}
                          // gettingRent = {this.gettingRent}
                          // postingRent = {this.postingRent}
                          // deletingRent = {this.deletingRent}

                          // visitorData = {this.state.visitorData}
                          // gettingVisitor = {this.gettingVisitor}
                          // postingVisitor = {this.postingVisitor}
                          // deletingVisitor = {this.deletingVisitor}

                          // expenseData = {this.state.expenseData}
                          // gettingExpense = {this.gettingExpense}
                          // postingExpense = {this.postingExpense}
                          // deletingExpense = {this.deletingExpense}

                          AnnoucData={this.state.AnnoucData}
                          gettingAnnoucements={this.gettingAnnoucements}
                          postingAnnoucements={this.postingAnnoucements}
                          deletingAnnoucements={this.deletingAnnoucements}
                          ideasData={this.state.ideasData}
                          gettingIdeas={this.gettingIdeas}
                          postingIdeas={this.postingIdeas}
                          deletingIdeas={this.deletingIdeas}
                        />
                      )}
                    />
                  );
                })}
                <Redirect to="/Student" />
              </Switch>
              <Footer fluid />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Dashboard;
