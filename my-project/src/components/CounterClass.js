import React, { Component } from "react";

class CounterClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };

    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    this.setState({ count: this.state.count + 1 });
  }

  decrementCount() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h2>Counter using Class Component</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
        <button onClick={this.decrementCount}>Decrement</button>
      </div>
    );
  }
}

export default CounterClass;
