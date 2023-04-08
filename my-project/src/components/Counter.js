import React from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter, resetCounter } from '../actions/counterActions';

function Counter(props) {
  const { count, increment, decrement, reset } = props
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(incrementCounter()),
    decrement: () => dispatch(decrementCounter()),
    reset: () => dispatch(resetCounter())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
