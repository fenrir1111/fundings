import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react'
import TabPanels from "./components/TabPanels";



class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          address:null
      }
  }

  componentDidMount(){
      //  获取当前的account账户信息
  }

  render() {
    return (
      <Container className="App">
        <header className="App-header">
            <h1> 众筹辣辣 </h1>
            <img src="https://api.gushi.ci/all.svg" alt="poem"/>
            <br/>
            <br/>
            <p>您的地址是： 0x2342sdadf</p>
        </header>
          <br/>
          <TabPanels/>
      </Container>
    );
  }
}

export default App;
