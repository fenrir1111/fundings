import React, { Component } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react'
import TabPanels from "./components/TabPanels";
import Api from "./utils/interaction";



class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          address:null
      }
  }

  componentDidMount(){
      //  获取当前的account账户信息
         Api.getAccounts()
          .then(accounts => {
              console.log(accounts)
          this.setState({
              address: accounts[0]
          })

            })
          .catch(e =>  console.log.error(e))
  }

  render() {
    const {address} = this.state
    return (
      <Container className="App">
        <header className="App-header">
            <h1> 众筹辣辣 </h1>
            <img src="https://api.gushi.ci/all.svg" alt="poem"/>
            <br/>
            <br/>
            {
                address ? ( <p>您的地址是： {address}</p>) : '请登录后刷新页面'
            }

        </header>
          <br/>
          <TabPanels/>
      </Container>
    );
  }
}

export default App;
