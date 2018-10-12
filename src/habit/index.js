import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Habit extends Component {

  constructor(props){
    super(props);

    this.state = {
    	inputs:{
    		_id : "",
    		title : "",
    		enable : true,
    		softdelete : false
    	},
    	data : []
    }
  }

  componentDidMount(){
  	fetch('http://localhost:2004/habit', {
          method: 'GET'}).then((res) => {
          return res.json();
      }).then((result) => {
        if(result.error){
          alert(result.error);
        }else{
        	console.log(result)
        	this.setState({data:result.data})

          	console.log(result.data)
          }
          });
  }

  isNameValid(){
    var regName = /^[0-9a-zA-Z]+$/;
    if(!this.state.inputs.title.match(regName)){
      this.setState({
        title_errorText: 'Enter the valid title',
      });
    }else{
      this.setState({
        title_errorText: ''
      });
      return true;
    }
    return false;
  }

  postHabit(input){
  	console.log(input)
  	var self=this
          
      return fetch('http://localhost:2004/habit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input)
      }).then((res) => {
          return res.json();
      }).then((result) => {
        if(result.error){
          alert(result.error);
        }else{
        	let objdata = result.data;
        	let data=self.state.data
        	var val = data.find(function(item, i){
			  if(item._id === objdata._id){
			    return i;
			  }
			});
			  	if(val === -1){
			  		data.unshift(objdata);
			  	}else{
			  		if(objdata.softdelete === true){
			  			data.splice(val, 1);
			  		}else{
			  			data[val] = objdata;
			  		}
			  	}
			  let	inputs:{
    		_id : "",
    		title : "",
    		enable : true,
    		softdelete : false
    	}
          self.setState({
             data, inputs 
          });
        }
      });
    }

  textChange(e){
  	let { inputs } = this.state;
  	inputs.title = e.target.value;
  	this.setState({ inputs })
  }
  createdata(){
  	let { inputs } = this.state;
  	this.postHabit(inputs);
  }

  enableChange(inputs){
  	console.log(inputs)
	inputs.enable = inputs.enable === true?false:true;
  	this.postHabit(inputs);	
  }

  softdeleteChange(inputs){
  console.log(inputs)
  	this.postHabit(inputs);
  }
  render() {
  	const { data,inputs } = this.state;
    return (
      <div className="row w-100 m-0">
     	 <div className="col-md-5 white-bg rounded p-4">
        <h1> Habits </h1>
        <ul>
  <li>
  		        <Form>
          <FormGroup>
          <div className={"col-md-10"} >
            <Input type="text" name="title" id="title" placeholder="Enter the habit" value={inputs.title} onChange={this.textChange.bind(this)} />
            </div>
            <div className={"col-md-2 e"} ><Button className="bg-secondary-color w-100" onClick={()=>this.createdata()}>Create</Button></div>
            {this.state.title_errorText}
            
          </FormGroup>
</Form>

  </li>{
  data.map(item=>{
  	 return <li>
  	 <div>
  	 <i className={ item.enable === true ? "fas fa-check green":"fal fa-check grey" }  onClick={()=>this.enableChange(item)}></i><p>{item.title}</p></div></li>
  })	
}
 
  </ul>
        </div>
      <div className="col-sm-7 text-center">
       
      </div> 
    </div>
    )
  }
}
