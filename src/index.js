import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from "jquery";

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {person: []};
  }
  
  componentDidMount() {
    this.UserList();
  }
  
  UserList() {
    $.getJSON('http://fcc-profile-scraper.herokuapp.com/user/user512')
      .done(function(data){
        console.log(data);
      });
    
    //  .then(({ results }) => this.setState({ person: results }));
  }
  
  render() {


    return (
      <div id="layout-content" className="layout-content-wrapper">
      </div>
    );
  }
}



// ========================================

ReactDOM.render(
  <UserListComponent />, document.getElementById('root')
);