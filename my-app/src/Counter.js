import './Counter.css'
import App from './App'
import { useDispatch, useSelector } from 'react-redux';

function Counter(){

  const dispatch = useDispatch()
  const count = useSelector(state => state.count)
  console.log(count)

  const increment = () => {
    dispatch({type:'INCREMENT', load: 1})
  }

  const decrement = () => {
    dispatch({type:'DECREMENT', load: 1})
  }

  return (
    <>
      <div className="container">
        <div className="counter">
          <h2 className="count">Count: {count}</h2>
          <div className="btn-container">
            <button className="increment" onClick={() => increment()}>Increment</button>
            <button className="decrement" onClick={() => decrement()}>Decrement</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Counter;