import React, { Component } from 'react';
import './App.css';
import { Table } from 'reactstrap';


class App extends Component {
  // Initialize state
  state = { 
    passwords: [],
    emails: []
  }

  // Fetch passwords and emails after first mount
  componentDidMount() {
    // this.getPasswords();
    this.getEmails_Passwords();
  }


  getEmails_Passwords=()=>{
    fetch('/api/emails')
      .then(res=>res.json())
      .then(emails=>this.setState({emails}));


    fetch('/api/passwords')
    .then(res => res.json())
    .then(passwords => this.setState({ passwords }));
  }



  // upload_data=()=>{
  //   fetch('/api/upload',{method:'POST'})
  //     .then(response => {
  //       if(response.ok){
  //         console.log("click recorded");
  //         return;
  //       }
  //       throw new Error("Request failed.");
  //     })
  //     .catch(function(error){
  //       console.log(error);
  //     });
  // }




  render() {
    const { passwords } = this.state;
    const { emails } = this.state;

    const style1={
      padding: '10%',
      width: '30%',
      float: 'left'
    };




    return (
      <div className="App">
          <div>

          <ul style={style1}>
            {emails.map((email, index) =>
            <tr key={index}>
              {email}
            </tr>
            )}
            </ul>


            
            <ul style={style1}>
            {passwords.map((password, index) =>
            <tr key={index}>
              {password}
            </tr>
            )}
            </ul>

            {/* <ul style={style1}>
            {emails.map((email, index) =>
            <li key={index}>
              {email}
            </li>
            )}
            </ul>


            
            <ul style={style1}>
            {passwords.map((password, index) =>
            <li key={index}>
              {password}
            </li>
            )}
            </ul> */}
          </div>
   


          <div>
            <button
              className="more"
              onClick={this.getEmails_Passwords}>
              Get More
            </button>

            <div>
              <br />
              <button className="upload" onClick={this.upload_data}> Upload Data </button>
            </div>
          </div>


          
        
        

      </div>
    );
  }
}

export default App;





  //The below code has been merged with getEmails_Passwords()
  // getPasswords = () => {
  //   // Get the passwords and store them in state
  //   fetch('/api/passwords')
  //     .then(res => res.json())
  //     .then(passwords => this.setState({ passwords }));
  // }