import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AuthorRecentWorks from './AuthorRecentWorks/AuthorRecentWorks';


class App extends Component {
  state= {
    inputVal:'',
    author:'',
    valid:true,
    authorSummary:'',
    authorExist: false,
    authorLifeStatus:'',
    authorRecentWorks:'',
    showRecentWorks:false

    }
    inputHandler = (event) =>{
      this.setState({inputVal:event.target.value})
    }
    searchClickedHandler = () => {
      if (!this.state.inputVal){
        alert("Please Enter Author Name First");
      }
      else{
            if(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(this.state.inputVal)) {
              this.setState({author:this.state.inputVal})
              if(this.state.authorSummary.key && this.state.authorSummary.key.indexOf(this.state.author) !== -1){
                this.setState({authorExist: true, valid: true});
                if(new Date().getFullYear > this.state.authorSummary.death_date){
                  this.setState({authorLifeStatus: "Dead"});
                }
              }
              else{
                this.setState({authorExist:false});
              }
          }
            else{
              this.setState({valid:false , showRecentWorks: false, authorExist:false});
            }
      }
    }
    showRecentWorkHandler = () =>{
      this.setState({showRecentWorks:true});
    }

    componentDidMount() {
      const baseAPIForAuthorKey = 'http://openlibrary.org/authors/OL1A.json ';
      const baseAPIForRecentWorks = 'http://openlibrary.org/authors/OL1A/works.json';
     
          axios.get(baseAPIForAuthorKey).then(response => {
            this.setState({authorSummary:response.data})
          });
          axios.get(baseAPIForRecentWorks).then(response => {
            this.setState({authorRecentWorks:response.data.entries})
            console.log(this.state.authorRecentWorks);
          });
  }
  render() {
    let errorMessage='';
    let authordescription='';
    let recentWorkTitles="";
    if(!this.state.valid){
      errorMessage= <div className="errorMessage"><h2>Please Enter Alphanumeric Value</h2></div>
    }
    if(this.state.valid && this.state.authorSummary.key && this.state.authorSummary.key.indexOf(this.state.author) === -1){
      errorMessage= <div className="errorMessage"><h2>There is no Author with code {this.state.author} in our system.
      Please try again.</h2></div>
    }
    else{
      if(this.state.valid && this.state.authorExist){
      authordescription= <div><h2>{this.state.authorSummary.name}</h2>
                            <h2>({this.state.authorLifeStatus})</h2>
                            <button onClick={this.showRecentWorkHandler}>Show Recent Works</button>
                          </div>
      }
    }

    if(this.state.showRecentWorks){
      recentWorkTitles= <AuthorRecentWorks recentworks={this.state.authorRecentWorks} />
    }
    return (
      <div className="App">
        <header className="App-header">
         <h1>Hoolime Assessment</h1>
        </header>
        <div className="Input-container">
            <input type="text" onChange={(event) => this.inputHandler(event)}/>
            <span onClick={this.searchClickedHandler}><i class="fas fa-search"></i></span>
            {errorMessage}
            {authordescription}
        </div>
        {recentWorkTitles}
      </div>
    );
  }
}

export default App;
