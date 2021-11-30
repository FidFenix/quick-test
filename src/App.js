import BoardComponent from './components/Board';

import './App.css';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className='Title'>
          <h1 class="title is-2">Balance () :( Checker :) ()  <em>(Fidel Mamani)</em> </h1>
          <p>This program checks wheter a message is balanced or not.</p>
        </div>
        <BoardComponent />
      </div>
    </div>
  );
}

export default App;
