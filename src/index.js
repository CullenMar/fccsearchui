import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from "jquery";

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue1: '',
      textInputValue2: '',
      userName: null,
      userProfImg: null,
      userLoc: null,
      studentList: [],
      textVal: '',
      msg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.scraperSearch = this.scraperSearch.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  
  handleChange(e) {
    this.setState({textVal: e.target.value});
  }
  
  //handles scraper requests
  scraperSearch() {
    var input = this.state.textVal;
    $.getJSON('http://fcc-profile-scraper.herokuapp.com/user/' + input)
      .done(function(data){
        this.setState({
          userName: "Name: " + data.name,
          userProfImg: data.profileImage,
          userLoc: data.location,
          msg: '',
          studentList: [...this.state.studentList, data],
        });
    }.bind(this)).fail(function() {
      this.setState({
        userName: '',
        userProfImg: '',
        userLoc: '',
        msg: input + ' does not exist.',
      })
    }.bind(this));
  }
  
  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
      this.scraperSearch();
    }
  }
  
  //create the html
  render() {
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <form>
          <label>
            <div className="message">{ this.state.msg }</div>
            Username:
            <input type="text" value={this.state.textVal} onChange={this.handleChange} onKeyPress={this.onKeyPress} />
          </label>
          <input type="button" value="SEARCH" onClick={this.scraperSearch}/>
          <br />
          <DisplayUser userData={this.state.studentList} userNameD={this.state.userName} userProfImgD={this.state.userProfImg} userLocD={this.state.userLoc} />
        </form>
      </div>
    );
  }
}

class DisplayUser extends React.Component {
  constructor(props) {
    super(props);
    this.htmlStuff = '';
    this.htmlTest = "<tr> <td>Smill Smates</td> <td>stuff3</td> <td>stuff4</td> </tr>";
  }
  
  handleRemove(x) {
    
  }
  
  render() {
    let rows = [];
    let counter = 0;
    console.log(this.props.userData.length);
    while (this.props.userData.length > counter) {
      this.htmlStuff = this.htmlStuff + "<tbody><tr><td>" + this.props.userData[counter].name + "</td><td>" + this.props.userData[counter].profileImage + "</td><td>" + this.props.userData[counter].location + "</td></tr></tbody>";
      let cell = [];
      cell.push(<td>{this.props.userData[counter].name}</td>);
      cell.push(<td><img className ="imgs" src={this.props.userData[counter].profileImage} alt="Unavailable" /></td>);
      cell.push(<td>{this.props.userData[counter].location}</td>);
      cell.push(<td><input type="button" value="Remove" onClick={this.handleRemove(counter)}/></td>);
      rows.push(<tr>{cell}</tr>);
      counter = counter + 1;
    }
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <table className="studentTable">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Picture</th>
            <th>Location</th>
            <th>Remove</th>
          </tr>
        </tbody>
        <tbody>
          {rows}
        </tbody>
        </table>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <UserListComponent />, document.getElementById('root')
);