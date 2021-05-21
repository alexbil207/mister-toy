import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react';
import { HeaderCmp } from "./cmps/HeaderCmp.jsx";
import { ToyApp } from "./pages/ToyApp.jsx";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { ToyEdit } from "./pages/ToyEdit.jsx";
import { connect } from 'react-redux'
import { onLoadUser, onLogOut, onSignUp } from './store/actions/user.actions'
import { LoginForm } from './pages/LoginForm';
import { SignUpForm } from './pages/SignUpForm';
import { About } from './pages/About';
import { DashBoard } from './pages/DashBoard';

class _App extends React.Component {
  render() {
    const { user, onLoadUser, onLogOut, onSignUp } = this.props
    return (
      <Router>
        <div className="App">
          <header>
            <HeaderCmp
              user={user}
              onLoadUser={onLoadUser}
              onLogOut={onLogOut}
              onSignUp={onSignUp}
            />
          </header>
          <main>
            <Switch>
              <Route component={DashBoard} path='/DashBoard' />
              <Route component={About} path='/About' />
              <Route component={ToyEdit} path='/toy/new' />
              <Route component={ToyEdit} path='/toy/edit/:toyId' />
              <Route component={ToyDetails} path='/toy/:toyId' />
              <Route component={SignUpForm} path='/signup' />
              <Route component={LoginForm} path='/login' />
              <Route component={ToyApp} path='/' />
            </Switch>
          </main>
        </div>
      </Router>

    );
  };
}


function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  }
}


const mapDispatchToProps = {
  onLoadUser,
  onLogOut,
  onSignUp
}



export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
