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

  componentWillMount(){
  	let self = this;
  	fetch('http://localhost:2004/habit', {
          method: 'GET'}).then((res) => {
          return res.json();
      }).then((result) => {
        if(result.error){
          alert(result.error);
        }else{
        	console.log(result)
        	self.setState({data:result.data})

          	console.log(result.data);
          	console.log(self.state.data);
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
        	let { data,inputs }=self.state;
        	var val = data.map(function(e) { return e._id; }).indexOf(objdata._id);
   		  	if(val === -1 || val === null || val === undefined){
			  		data.unshift(objdata);
			  	}else{
			  		if(input.softdelete === true){
			  			data.splice(val, 1);
			  		}else{
			  			data[val] = input;
			  		}
			  	}
			inputs._id = "",
    		inputs.title = "",
    		inputs.enable = true,
    		inputs.softdelete = false
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
  	inputs.enable = inputs.enable === true?false:true;
  	this.postHabit(inputs);	
  }

  softdeleteChange(inputs){
  inputs.softdelete = inputs.softdelete === true?false:true;
  console.log(inputs);
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

								<div className="formpadding" >
									<Input type="text"  placeholder="Enter the habit" onChange={this.textChange.bind(this)} value={inputs.value}  />
								</div>
								<div className="col-sm-3 formpadding" ><Button className="bg-secondary-color w-100" onClick={()=>this.createdata()}>Create</Button></div>
								{this.state.title_errorText}
							</FormGroup>
						</Form>
						</li>{
							data.map(item=>{
								return <li>
									<div>
										<i className={ item.enable === true ? "fas fa-check green":"fas fa-check grey" }  onClick={()=>this.enableChange(item)}></i>
											<p>{item.title}</p>
										<i className={ item.softdelete === false ? "fa fa-window-close red":"fa fa-window-close grey" }  onClick={()=>this.softdeleteChange(item)}></i>
									</div>
								</li>
							})	
						}
					</ul>
				</div> 
			</div>
    )
  }
}
