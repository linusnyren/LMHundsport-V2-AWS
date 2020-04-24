import React,{useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './AppRouter.css'
import { Nav, Navbar,Row,Col } from 'react-bootstrap'
//import Contact from './pages/Contact'
import Home from './pages/Home'
import LoginRegister from './pages/LoginRegister'
import ActivitiesPage from './pages/ActivitiesPage'
import { Auth } from "aws-amplify";
import AddEvent from './pages/AddEvent'
import OrangeButton from '../components/shared/OrangeButton'
import axios from 'axios'
export default function AppRouter() {
    const [loggedinUser, setLoggedInUser] = useState()
    useEffect(()=>{
        getLoggedInUser()
    },[])
    const getLoggedInUser=async()=>{
        try{
            let user = await Auth.currentAuthenticatedUser()
            if(user.attributes){
              setLoggedInUser(user.attributes)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    const logout=()=>{
      Auth.signOut({ global: true })
      .then(res => {
            setLoggedInUser(null);
            axios.defaults.headers.common['Authorisation'] = "";
            window.location.reload()
        })
    }
    /*const adminPanel=()=>{
      if(adminlist.includes(loggedinUser)){
        return true
      }
      else{
        return false
      }
    }*/
  return (
    <div>
      <Router>
        <Navbar sticky='top' bg="blue" variant="light" expand="lg">
          <Navbar.Brand><Link className="navLogo" to="/"> LM-HUNDSPORT</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="navBarItem" to="/">HEM</Link>
              <Link className="navBarItem" to="/activities">AKTIVITETER</Link>
              <Link className="navBarItem" to="/contact">KONTAKT</Link>
              <Link className="navBarItem" to="/about">OM</Link>
              <Link className="navBarItem" to="/addEvent">Lägg till</Link>
            </Nav>
            <Navbar.Text>
              {loggedinUser ? 
                <Row>
                  <Col><h6>Inloggad som: {loggedinUser.given_name}</h6></Col>
                  <Col><OrangeButton onClick={() => logout()}>Logga ut</OrangeButton></Col>
                  </Row>
                :
                <div>
                    <OrangeButton><Link className="loginRegister" to="/loginregister">Logga in / Registrering</Link></OrangeButton>
                </div>}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/loginregister" component={LoginRegister}>
            <LoginRegister />
          </Route>
          <Route path="/activities" component={ActivitiesPage}>
            <ActivitiesPage />
          </Route>
          <Route path="/addEvent" component={AddEvent}>
            <AddEvent />
          </Route>
          <Route path="/" component={Home}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}