import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { manager: '' }
    }

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();

        this.setState({ manager });
    }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Lottery app
          </h2>
          <p> Contract managed by: {this.state.manager} </p>
        </header>
      </div>
    );
    }
}
export default App;
