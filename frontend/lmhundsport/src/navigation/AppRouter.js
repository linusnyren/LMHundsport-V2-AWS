import React,{useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './AppRouter.css'
import { Nav, Navbar,Button } from 'react-bootstrap'
import Register from './pages/Register'
//import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import { Auth } from "aws-amplify";
//import AddEvent from './pages/AddEvent'
//import About from './pages/About'
export default function AppRouter() {
    const [loggedinUser, setLoggedInUser] = useState()
    useEffect(()=>{
        getLoggedInUser()
    })
    const getLoggedInUser=async()=>{
        try{
            let user = await Auth.currentAuthenticatedUser()
            setLoggedInUser(user.attributes)
        }
        catch(err){
            console.log(err)
        }
    }
    const logout=()=>{
       Auth.signOut().then(res => {
            setLoggedInUser(null);
            window.location.reload();
        })
    }
  return (
    <div>
      <Router>
        <Navbar sticky='top' bg="dark" variant="dark" expand="lg">
          <Navbar.Brand><Link className="navLogo" to="/addevent"> LM-HundSport</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="navBarItem" to="/">Hem</Link>
              <Link className="navBarItem" to="/events">Aktiviter</Link>
              <Link className="navBarItem" to="/contact">Kontakta mig</Link>
              <Link className="navBarItem" to="/about">Om Linn</Link>
            </Nav>
            <Navbar.Text>
              {loggedinUser ? 
                <div style={{flexDirection: 'row', alignContent:'center'}}>
                  <h6>Inloggad som: {loggedinUser.given_name}</h6>
                  <Button onClick={() => logout()}>Logga ut</Button>
                </div>
                :
                <div>
                    <Link to="/login"> Login </Link>
                    <Link to="/register"> Register </Link>
                </div>}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/login" component={Login}>
            <Login />
          </Route>
          <Route path="/register" component={Register}>
            <Register />
          </Route>
          <Route path="/" component={Home}>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}