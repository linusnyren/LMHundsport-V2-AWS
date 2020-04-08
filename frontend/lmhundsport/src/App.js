import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import AppRouter from './navigation/AppRouter'
import AWSAmplifyConfig from './config/AWS-AmplifyConfig.js';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

function App() {
  Amplify.configure(AWSAmplifyConfig);
  return (
    <AppRouter />
  );
}

export default App;
