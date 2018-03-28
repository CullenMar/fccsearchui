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
      textVal: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.testFunc = this.testFunc.bind(this);
  }
  
  handleChange(event) {
    this.setState({textVal: event.target.value});
  }
  
  componentDidMount() {
    this.UserList();
  }
  
  UserList() {
    $.getJSON('http://fcc-profile-scraper.herokuapp.com/user/user512')
      .done(function(data){
        console.log(data);
        this.setState({
          userName: data.name,
          userProfImg: data.profileImage,
          userLoc: data.location
        });
      }.bind(this));
  }
  
  testFunc() {
    alert("::" + this.state.textVal);
    
    
    return;
  }
  
  
  render() {
    return (
      
      <div id="layout-content" className="layout-content-wrapper">
        <div className="na">{ this.state.userName + " " + this.state.userLoc }</div>
        <form>
          <label>
            Username:
            <input type="text" value={this.state.textVal} onChange={this.handleChange} />
          </label>
          <input type="button" value="|S|E|A|R|C|H|" onClick={this.testFunc}/>
        </form>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <UserListComponent />, document.getElementById('root')
);