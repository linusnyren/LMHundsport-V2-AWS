import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import AWSAmplifyConfig from './config/AWS-AmplifyConfig';
import Register from './components/Register';
import Sitenavbar from './Sitenavbar';


// import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

function App() {
  Amplify.configure(AWSAmplifyConfig);
  return (
    <div className="App">
      <Sitenavbar />
      <header className="App-header">
        <Register />
        <h1 className="welcome"> Välkommen till LM Hundsport</h1>
      </header>
    </div>
  );
}

export default App;
