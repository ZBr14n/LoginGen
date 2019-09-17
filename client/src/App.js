import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';


class App extends Component {
  // Initialize state
  state = { 
    passwords: [],
    emails: [],

    //The json data returned from the server is an object, not an array, hence we need a way to use the map() function.
    dataViewObj: {},
    dataViewArr: [],

  }

  // Fetch passwords and emails after first mount (when the react page loads for the first time)
  componentDidMount() {   
    this.getEmails_Passwords();
    //this.viewData();      //retrieves Mongo database records            viewdata contains viewDatabaseLogs()
    
  }
 

  //this will display emails and passwords generated from the server when calling map() 
  getEmails_Passwords=()=>{
    fetch('/api/emails')
      .then(res=>res.json())
      .then(emails=>this.setState({emails}));


    fetch('/api/passwords')
    .then(res => res.json())
    .then(passwords => this.setState({ passwords }));

  }



  upload_data=()=>{
    fetch('/api/upload',{method:'POST'})
      .then((response) => {
        if(response.ok) {
          console.log('Emails and passwords have been recorded.');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  viewData=()=>{
    fetch('/logs/retrieveData', {method: 'GET'})
    .then((response) => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then((data) => {

      this.setState({
        dataViewObj: data
        //dataViewArr: [this.state.dataViewObj]
      });

       this.viewDatabaseLogs();
       
    })
    .catch((error) => {
      console.log(error);
    });
    
    //window.open("https://frozen-mesa-12349.herokuapp.com/logs/retrieveData");
    window.open("http://localhost:5000/logs/retrieveData");
  }
    
  //traverses and convert array of objects to an array of array that holds emails and passwords.
  //original version:
  // viewDatabaseLogs=()=>{
  //   //let store=[];
  //   for(let i=0; i < this.state.dataViewObj.result.length; i++){      
      
  //     this.state.dataViewArr.push(
  //     this.state.dataViewObj.result[i].emails,
  //     this.state.dataViewObj.result[i].passwords
  //     );
      
  //   }
  //   // this.state.dataViewArr.push(store);
  //   console.log(this.state.dataViewArr[this.state.dataViewArr.length-1]);

  //   //get the most up-to-date records from the database
  //   return this.state.dataViewArr[this.state.dataViewArr.length-1];        
  // }


  viewDatabaseLogs=()=>{
    //let store=[];
    for(let i=0; i < this.state.dataViewObj.result.length; i++){      
      
      this.state.dataViewArr.push(
      this.state.dataViewObj.result[i].emails,
      this.state.dataViewObj.result[i].passwords
      );
      
    }
    // this.state.dataViewArr.push(store);
    //console.log(this.state.dataViewArr[this.state.dataViewArr.length-1]);
    console.log(this.state.dataViewArr);

    //get the most up-to-date records from the database
    //return this.state.dataViewArr[this.state.dataViewArr.length-1];        
  }




  MapData=()=>{
    return(
      <ul>
      {this.state.dataViewArr.map((item, index) =>
      <li key={index}>        
        {item} <br />              
      </li>
      )}
    </ul>
    );
  }

  render() {
    const { passwords } = this.state;
    const { emails } = this.state;
    

    const styleButton={
      padding: '10px 25px',
      fontSize: '32px'
    };

    return (
      <div className="App">     
          <div className="EmailsPasswords">            
              <ul>
                {emails.map((email, index) =>
                <li key={index}>
                  {email}
                </li>
                )}
              </ul>

                
              <ul>
                {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
                )}
              </ul>
                            

              {/* <ul>
                {this.state.dataViewArr.map((item, index) =>
                <li key={index}>
                  {item}
                </li>
                )}
              </ul> */}
                    
          </div>

 
          <div className="buttons">
            <button
              className="more"
              onClick={this.getEmails_Passwords}>
              Get More
            </button>

            <div>
              <br />
              <button className="upload" onClick={this.upload_data}> Upload Data </button>
              {/* <button className="dataView" onClick={this.MapData()}> View Data </button> */}
            </div>


            <div>
              <br />
              <Button color="info" style={styleButton} onClick={this.viewData}> View Logs </Button>
            </div>
          </div>

      </div>      
    );
  }
}

export default App;