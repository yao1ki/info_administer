import React, { Component } from 'react';

import './App.css';

import Child from './child'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            msg:'父类的消息',
            name:'John',
            age:99
        }
    }

    callback=(msg,name,age)=>{
        // setState方法,修改msg的值,值是由child里面传过来的
        this.setState({msg});
        this.setState({name});
        this.setState({age});
    }

  render() {
    return (
      <div className="App">
        <p> Message: &nbsp;&nbsp;{this.state.msg}</p>
        <Child callback={this.callback} age={this.state.age} name={this.state.name}></Child>
      </div>
    );
  }
}

export default App;
