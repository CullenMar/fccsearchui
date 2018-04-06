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
    this.handleRemove = this.handleRemove.bind(this);
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
          textVal: '',
        });
    }.bind(this)).fail(function() {
      this.setState({
        userName: '',
        userProfImg: '',
        userLoc: '',
        msg: input + ' does not exist.',
      });
    }.bind(this));
  }
  
  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
      this.scraperSearch();
    }
  }
  
  //removes a student located at position x
  handleRemove(x) {
    console.log(x);
    let tempArray = this.state.studentList;
    tempArray.splice(x, 1);
    this.setState({
      studentList: tempArray,
    });
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
          <DisplayUser userData={this.state.studentList} actionDelete={this.handleRemove}/>
        </form>
      </div>
    );
  }
}

class DisplayUser extends React.Component {
  
  render() {
    let rows = [];
    var counter = 0;
    while (this.props.userData.length > counter) {
      let cell = [];
      cell.push(<td key={0}>{this.props.userData[counter].name}</td>);
      cell.push(<td key={1}><img className ="imgs" src={this.props.userData[counter].profileImage} alt="Unavailable" /></td>);
      cell.push(<td key={2}>{this.props.userData[counter].location}</td>);
      cell.push(<td key={3}><input type="button" value="Remove" onClick={() => this.props.actionDelete(counter)}/></td>);
      rows.push(<tr key={counter}>{cell}</tr>);
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