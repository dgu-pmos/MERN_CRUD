import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import TutorialsList from './components/tutorialsListComponent';
import AddTutorial from './components/addTutorialComponent';
import Tutorial from './components/tutorialComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* 상단에 nav 태그로 리다이렉트 */}
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              bezKoder
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/tutorials'} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/add'} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            {/* Switch 컴포넌트 : 하위 라우터 중에 하나를 선택 */}
            <Switch>
              {/* Route 컴포넌트 : 경로로 route 된다면 어떤 컴포넌트 렌더링 */}
              <Route exact path={['/', '/tutorials']} component={TutorialsList}></Route>
              <Route exact path='/add' component={AddTutorial}></Route>
              <Route path="/tutorials/:id" component={Tutorial}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
