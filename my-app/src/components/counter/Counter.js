import styles from './Counter.module.css'
import { useDispatch, useSelector } from 'react-redux';

function Counter(){

  const dispatch = useDispatch()
  const count = useSelector(state => state.count)

  const increment = () => {
    dispatch({type:'INCREMENT', load: 1})
  }

  const decrement = () => {
    dispatch({type:'DECREMENT', load: 1})
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.counter}>
          <h2 className={styles.count}>Count: {count}</h2>
          <div className={styles.btnContainer}>
            <button className={styles.increment} onClick={() => increment()}>Increment</button>
            <button className={styles.decrement} onClick={() => decrement()}>Decrement</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Counter;