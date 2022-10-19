import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <br></br>
        <p>
        <div id="nav">
        <ul>
          <li><a class="active" href="#home">Home</a></li>
          <li><a href="#courses">Courses</a></li>
          <li><a href="#contact">Placeholder 1</a></li>
          <li><a href="#about">Placeholder 2</a></li>
        </ul>
        </div>
        </p>
      </header>
    </div>
  );
}

export default App;
