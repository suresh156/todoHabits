import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      userName: '',
      mobNumber: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      name_errorText: '',
      mobile_errorText: '',
      email_errorText: '',
      password_errorText: '',
      cpassword_errorText: ''
    }
  }

  setName(event){
    this.setState({ userName: event.target.value});
    setTimeout(()=> { 
      this.isNameValid();
    },200);
  }

  isNameValid(){
    var regName = /^[0-9a-zA-Z]+$/;
    if(!this.state.userName.match(regName)){
      this.setState({
        name_errorText: 'Enter the valid name!',
      });
    }else{
      this.setState({
        name_errorText: ''
      });
      return true;
    }
    return false;
  }

  setMobile(event){
    this.setState({ mobNumber: event.target.value });
    setTimeout(()=> { 
      this.isMobileValid();
    },200);
  }

  isMobileValid(){
    var regPhone = /^\d+$/.test(this.state.mobNumber);
    if(this.state.mobNumber.length != 10 || !regPhone){
      this.setState({
        mobile_errorText: 'Please enter the valid phone number!'
       });
    }else{
       this.setState({
        mobile_errorText: ''
       });
       return true;
    }
    return false;
  }


  setEmail(event){
    this.setState({ emailAddress: event.target.value });
    setTimeout(()=> { 
      this.isEmailValid();
    },200);
  }


  isEmailValid(){
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.emailAddress.length == 0){
      this.setState({
        email_errorText: 'Email is required!'
      });
    }else if(regEmail.test(this.state.emailAddress) === false){
      this.setState({
        email_errorText: 'Enter the valid email!'
      });
    }else{
      this.setState({
        email_errorText: ''
      });
      return true;
    }
    return false;
  }

  setPassword(event){
    this.setState({ password: event.target.value});
    setTimeout(()=> { 
      this.isPasswordValid();
    },200);
  }

  isPasswordValid(){
    if(this.state.password.length == 0){
      this.setState({
        password_errorText: 'Password is required!'
      });
    }else if(this.state.password.length < 8){
      this.setState({
        password_errorText: 'Password length must be 8 characters!'
      });
    }else{
      this.setState({
        password_errorText: ''
      });
      return true;
    }
    return false;
  }


  setConfirmPassword(event){
    this.setState({ confirmPassword: event.target.value});
    setTimeout(()=> { 
      this.isConfirmPasswordValid();
    },200);
  }

  isConfirmPasswordValid(){
    if(this.state.confirmPassword != this.state.password){
      this.setState({
        cpassword_errorText: "Password doesn't match!"
      });
    }else{
      this.setState({
        cpassword_errorText: ''
      });
      return true;
    }
    return false;
  }


  registerUser(event){
    if(!this.isNameValid()){

    }if(!this.isMobileValid()){

    }if(!this.isEmailValid()){

    }if(!this.isPasswordValid()){

    }if(!this.isConfirmPasswordValid()){
    
    }else{
      return fetch('https://reqres.in/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.emailAddress,
            password: this.state.password
          })
      }).then((res) => {
          return res.json();
      }).then((result) => {
        if(result.error){
          alert(result.error);
        }else{
          var self=this
          alert("Registration Token: "+result.token);
          self.props.history.push('/login')
          this.setState({
             userName: '',
             mobNumber: '',
             emailAddress: '',
             password: '',
             confirmPassword: '',
             name_errorText: '',
             mobile_errorText: '',
             email_errorText: '',
             password_errorText: '',
             cpassword_errorText: ''
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="row w-100 m-0">
      <div className="col-md-5 white-bg rounded p-4">
        <div className="m-3">
          <img src={require('../../resources/imgs/logo.png')} />
        </div>
        <Form>
          <h5 className="mb-4">REGISTER</h5>
          <FormGroup>
            <Input type="text" name="name" id="Name" placeholder="Name" value={this.state.userName} onChange={this.setName.bind(this)}/>
            {this.state.name_errorText}
          </FormGroup>
          <FormGroup>
            <Input type="tel" name="mobilenumber" id="mobileNumber" placeholder="Mobile Number" value={this.state.mobNumber} onChange={this.setMobile.bind(this)}/>
            {this.state.mobile_errorText}
          </FormGroup>
          <FormGroup>
            <Input type="email" name="email" id="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.setEmail.bind(this)}/>
            {this.state.email_errorText}
          </FormGroup>
          <FormGroup>
            <Input type="password" name="conf" id="password" placeholder="Password" value={this.state.password} onChange={this.setPassword.bind(this)}/>
            {this.state.password_errorText}
          </FormGroup>
          <FormGroup>
            <Input type="password" name="confirmpassword" id="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.setConfirmPassword.bind(this)}/>
            {this.state.cpassword_errorText}
          </FormGroup>
          <Button className="bg-secondary-color w-100" onClick={this.registerUser.bind(this)}><Link className="color-white" to="/register">Submit</Link></Button>
        </Form>
      </div>
      <div className="col-sm-7 text-center">
       
      </div>
    </div>
    )
  }
}
