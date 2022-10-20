import React from 'react';
import logo from './logo.png';
import myImage from '../src/timetable.png'
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
          <div class="form">
          <div class="title">Enter Desired Courses</div>
          <div class="input-container ic1">
            <input id="course1" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="course1" class="placeholder">Course 1</label>
          </div>
          <div class="input-container ic2">
            <input id="course2" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="course2" class="placeholder">Course 2</label>
          </div>
          <div class="input-container ic3">
            <input id="course1" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="course3" class="placeholder">Course 3</label>
          </div>
          <div class="input-container ic4">
            <input id="course1" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="course4" class="placeholder">Course 4</label>
          </div>
          <div class="input-container ic5">
            <input id="course1" class="input" type="text" placeholder=" " />
            <div class="cut"></div>
            <label for="course5" class="placeholder">Course 5</label>
          </div>
          <button type="text" class="submit">Generate Schedule</button>
        </div>
            <label class="container">Prefer Heavy Mornings
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Prefer Heavy Afternoons
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Prefer Heavy Evenings
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Avoid Thursdays
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Avoid Fridays
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Prefer Courses With Dr. Greg
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Allow Graduate Courses
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <br></br><br></br>
            <label class="container">Allow Courses With TBA Times
            <input type="checkbox"></input>
            <span class="checkmark"></span>
            </label>
            <img src={myImage} className="App-image" alt="logo"/>
        </p>
        
      </header>
    </div>
  );
}

export default App;
