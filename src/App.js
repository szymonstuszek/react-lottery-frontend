import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
    state = {
        manager: '',
        players: [],
        balance: '',
        value: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, players, balance });
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
              <p> There are currently {this.state.players.length} participating in the lottery,
                competing to win { web3.utils.fromWei(this.state.balance, 'ether') } ether!
              </p>
                <form>
                    <h4>Want to try your luck? </h4>
                    <div>
                      <label>Amount of ether to enter </label>
                      <input
                          value={this.state.value}
                          onChange={event => this.setState({ value: event.target.value })}
                      />
                    </div>
                    <button> Enter </button>
                </form>
            </header>

          </div>
        );
    }
}
export default App;
