import { useState } from 'react';
import './style.scss';
import Board from './components/Board';

function App() {
  // const [counter, setCounter] = useState(1);

  // const onBtnClick = () => {
  //   console.log('Hello');
  //   setCounter(currentCounter => {
  //     return currentCounter + 1;
  //   });
  // };

  return (
    <div className="app">
      <Board />
    </div>
  );
}

export default App;
