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
        value: '',
        message: ''
    };

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({ manager, players, balance });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: 'Waiting on transaction success...' })
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        });

        this.setState({ message: 'You have been entered! ' })
    };

    onClick = async (event) => {
        const accounts = await web3.eth.getAccounts();

        this.setState({ message: 'Waiting on transaction success...' })

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        this.setState({ message: 'The winner has been picked!' })
    };

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>
                Lottery app
              </h2>
              <p> Contract managed by: {this.state.manager} </p>
              <p> There are currently {this.state.players.length}  people participating in the lottery,
                competing to win { web3.utils.fromWei(this.state.balance, 'ether') } ether!
              </p>
                <form onSubmit={this.onSubmit}>
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

                <h4> Ready to pick a winner? </h4>
                <button onClick={this.onClick}>Pick a winner!</button>

                <h1>{this.state.message}</h1>
            </header>

          </div>
        );
    }
}
export default App;
