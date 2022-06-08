
import React from "react";
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { WindMillLoading } from 'react-loadingg';
import isAuthenticated from "../auth/index";
var axios = require("axios");

// var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false,
      panelData: [],
      supervisorData: [],
      StudentData: [],
      groupData: [],
      allotmentData: [],
      rentData: [],
      AnnoucData: [],
      loading: true,
    };
    this.gettingResources = this.gettingResources.bind(this);

    this.gettingStudent = this.gettingStudent.bind(this) ;
    this.postingStudent = this.postingStudent.bind(this) ;
    this.updatingStudent = this.updatingStudent.bind(this) ;
    this.deletingStudent = this.deletingStudent.bind(this) ;
    this.gettingAllotments = this.gettingAllotments.bind(this) ;
    this.gettingRent = this.gettingRent.bind(this) ;
    this.gettingAnnoucements = this.gettingAnnoucements.bind(this) ;
    this.gettingpanels = this.gettingpanels.bind(this) ;
    this.gettingsupervisors = this.gettingsupervisors.bind(this) ;
    this.gettinggroups = this.gettinggroups.bind(this) ;

  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      // ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    this.gettingResources()
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      // this.refs.mainPanel.scrollTop = 0;
    }
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/client") {
        let Comp = prop.component ;
        return (
          <Route
            path={prop.layout + prop.path}
            // component={prop.component}
            key={key}
            render = {
              (props) => (
                <Comp
                  {...props}

                  StudentData = {this.state.StudentData}
                  gettingStudent = {this.gettingStudent}
                  postingStudent = {this.postingStudent}
                  updatingStudent = {this.updatingStudent}
                  deletingStudent = {this.deletingStudent}

                  allotmentData = {this.state.allotmentData}

                  rentData = {this.state.rentData}

                  AnnoucData = {this.state.AnnoucData}
                  panelData = {this.state.panelData}
                  supervisorData = {this.state.supervisorData}
                  groupData = {this.state.groupData}
                />
              )
            }
          />
        );
      } else {
        return null;
      }
    });
  };
  // Student 
  async deletingStudent(id) {
    console.log("Deleting Student");
    try {
      var response = await axios.delete("http://localhost:3500/Student/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingStudent() ;
  }
  async postingStudent(name, photo, password,  email) {
    console.log("Posting Student");
    try {
      var header = {
        name: name,
        photo: photo,
        password: password,
        email: email,
      }
      var response = await axios.post("http://localhost:3500/Student", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingStudent() ;
  }
  async updatingStudent(id ,name, email) {
    console.log("Updating Student");
    try {
      var header = {
        name: name,
        email: email,
      }
      var response = await axios.put("http://localhost:3500/Student/" + id, header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingStudent() ;
  }
  async gettingStudent() {
    console.log("Getting Student");
    try {
      var response = await axios.get("http://localhost:3500/Student", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({StudentData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingAllotments() {
    console.log("Getting Allotments");
    try {
      var response = await axios.get("http://localhost:3500/allotment", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({allotmentData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingRent() { 
    console.log("Getting REnt");
    try {
      var response = await axios.get("http://localhost:3500/rentreceipts", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({rentData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingAnnoucements() { 
    console.log("Getting Annoucement");
    try {
      var response = await axios.get("http://localhost:3500/Annoucements", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({AnnoucData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingpanels() {
    console.log("Getting panels");
    try {
      var response = await axios.get("http://localhost:3500/panel", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({panelData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingsupervisors() {
    console.log("Getting supervisors");
    try {
      var response = await axios.get("http://localhost:3500/supervisor", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({supervisorData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettinggroups() {
    console.log("Getting supervisors");
    try {
      var response = await axios.get("http://localhost:3500/group", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({groupData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingResources() {
    if (isAuthenticated(sessionStorage.getItem('Student'))) {
      this.setState({loading: true});
      await this.gettingStudent();
      await this.gettingAllotments() ;
      await this.gettingRent();
      await this.gettingAnnoucements() ;
      await this.gettingpanels() ;
      await this.gettinggroups() ;
      await this.gettingsupervisors() ;
      this.setState({loading: false});
    }
    else {
      this.setState({loading: false});
    
    }
  }
  render() {
    return (
      <>
        {this.state.loading === true 
          ? <WindMillLoading size="large"/>
          :
          <div className="wrapper">
            <Sidebar
              {...this.props}
              routes={routes}
              bgColor={this.state.backgroundColor}
              activeColor={this.state.activeColor}
            />
            <div className="main-panel" ref="mainPanel">
              <AdminNavbar {...this.props}  />
              <Switch>{this.getRoutes(routes)}</Switch>
              {
                // we don't want the Footer to be rendered on full screen maps page
                this.props.location.pathname.indexOf("full-screen-map") !==
                -1 ? null : (
                  <Footer fluid />
                )
              }
            </div>
          </div>
        }
      </>
      
    );
  }
}

export default Admin;
