import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link
} from "react-router-dom";
import ProcessPayment100 from './pages/processpayment';

class App extends React.Component {
  render() {
  return (

    <Router>
      <div>
        <ProcessPayment100 />
        
      </div>
    </Router>
  );
};}

export default App;
