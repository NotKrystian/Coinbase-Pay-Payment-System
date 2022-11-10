import React from 'react';
import CoinbaseCommerceButton from "react-coinbase-commerce";
import axios from 'axios';
import { useId } from 'react';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function load() {
  console.log("loaded");
}

function failed() {
  console.log("failed");
  window.location.href = "https://payments.exchangefunding.net/?status=failed";
}

function success() {
  console.log("success");
  window.location.href = "https://dashboard.exchangefunding.net/";
}

async function remove(username) {
  let link = "https://146.19.173.29:8081/remove?username=" + username;
  await axios.get(link);
}

async function complete(username) {
  let link = "https://146.19.173.29:8081/complete?username=" + username;
  await axios.get(link);
}

class ProcessPayment100 extends React.Component {
    constructor(props){
        super(props);
        
        let params = (new URL(document.location)).searchParams;
        let urlUsername = params.get('username');

        this.state = {
          username : urlUsername,
        }
        this.updateUsername = this.updateUsername.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFail = this.onFail.bind(this);
        }
        
        
        updateUsername(event){
        this.setState({username : event.target.value})
        }
        
        
        async onSuccess(){
        //console.log('Your input value is: ' + this.state.username)
        await complete(this.state.username);
        success();
        //Send state to the server code
        }
        async onFail() {
        await remove(this.state.username);
        failed();
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
            <h4>Complete Payment : </h4>
            <hr class="mb-4" />

            <CoinbaseCommerceButton styled="yes" checkoutId="93e5a52f-adc4-4a8d-b48e-f8445b4386e8" onLoad={load} onPaymentDetected={this.onSuccess} onModalClosed={this.onFail}/>
          </div>
        </div>
     
      </div>
    );
};}


export default ProcessPayment100;