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
import NeuButton from '../components/shared/NeuButton'
import color from '../constants/color'
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
        <NeuButton color={color.orange}><Navbar.Brand><Link className="navBarItem" to="/"> LM-HUNDSPORT</Link></Navbar.Brand></NeuButton>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <NeuButton color={color.orange}><Link className="navBarItem" to="/">Hem</Link></NeuButton>
            <NeuButton color={color.orange}><Link className="navBarItem" to="/activities">Aktiviteter</Link></NeuButton>
            <NeuButton color={color.orange}><Link className="navBarItem" to="/contact">Kontakt</Link></NeuButton>
            <NeuButton color={color.orange}><Link className="navBarItem" to="/about">Om</Link></NeuButton>
            <NeuButton color={color.orange}><Link className="navBarItem" to="/addEvent">Lägg till</Link></NeuButton>
            </Nav>
            <Navbar.Text>
              {loggedinUser ? 
                <Row>
                  <Col><h6>Inloggad som: {loggedinUser.given_name}</h6></Col>
                  <Col><NeuButton color={color.orange} onClick={() => logout()}>Logga ut</NeuButton></Col>
                  </Row>
                :
                  <NeuButton color={color.orange}><Link className="navBarItem" to="/loginregister">Logga in / Registrering</Link></NeuButton>
                }
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