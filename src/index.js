import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from "jquery";

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      userProfImg: null,
      userLoc: null,
      
    };
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
  
  render() {
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">{ this.state.userName + " " + this.state.userLoc }</div>
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <UserListComponent />, document.getElementById('root')
);