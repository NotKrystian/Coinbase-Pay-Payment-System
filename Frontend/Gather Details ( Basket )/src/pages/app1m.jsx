import React from 'react';
import './App.css';
import CoinbaseCommerceButton from "react-coinbase-commerce";
import axios from 'axios';
import { useId } from 'react';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


class App1m extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      username : '',
      email : '',
      password : ''
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    updateUsername(event){
    this.setState({username : event.target.value})
    }
    updateEmail(event){
    this.setState({email : event.target.value})
    }
    updatePassword(event){
    this.setState({password : event.target.value})
    }
    
    
    handleSubmit(){
    //console.log('Your input value is: ' + this.state.username)
    let link = "http://localhost:8081/pending?username=" + this.state.username + "&email=" + this.state.email + "&password=" + this.state.password + "&value=1000000";
    axios.get(link);
    //Send state to the server code
    }
  
  render() {

    return (
    
      <div className="maincontainer">
       <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <h5 class="my-0 mr-md-auto font-weight-normal">Exchange Funding</h5>
          <nav class="my-2 my-md-0 mr-md-3">
          </nav>
        </div>
        <div class="container">
          <div class="py-5 text-center">
            
            <h2>Checkout</h2>
          </div>
          <div class="row">
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill">3</span>
              </h4>
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">ExchangeFunding $1,000,000 Funded Account</h6>
                  </div>
                  <span class="text-muted">$4000</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$4000</strong>
                </li>
              </ul>
              <form class="card p-2">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Promo code"/>
                  <div class="input-group-append">
                    <button type="button" class="btn btn-secondary">Redeem</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-8 order-md-1">
              <h4 class="mb-3">Billing address</h4>
              <form class="needs-validation" novalidate>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input type="text" class="form-control" id="firstName" placeholder=""  required />
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input type="text" class="form-control" id="lastName" placeholder=""  required />
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="username">Username</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">@</span>
                    </div>
                    <input type="text" class="form-control" id="username" onChange={this.updateUsername} placeholder="Username" required />
                    <div class="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" onChange={this.updateEmail} placeholder="you@example.com" required/>
                  <div class="invalid-feedback">
                    Please enter a valid email address for account access.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="address">Password</label>
                  <input type="password" class="form-control" id="password" onChange={this.updatePassword} placeholder="Password" required/>
                  <div class="invalid-feedback">
                    Please enter a valid password.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                  <div class="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                  <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                </div>
                <div class="row">
                  <div class="col-md-5 mb-3">
                    <label for="country">Country</label>
                    <input type="text" class="form-control" id="country" placeholder="" required/> 
                    <div class="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="state">State</label>
                    <input type="text" class="form-control" id="state" placeholder="" required/> 
                    <div class="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="zip">Zip</label>
                    <input type="text" class="form-control" id="zip" placeholder="" required />
                    <div class="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <hr class="mb-4" />
                <button class="btn btn-primary btn-lg btn-block" type="submit" onClick={this.handleSubmit} >Continue to checkout</button>
                </form>
            </div>
          </div>
          <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">&copy; 2022 ExchangeFunding</p>
          </footer>
        </div>
     
      </div>
      
)
};
}

export default App1m;
