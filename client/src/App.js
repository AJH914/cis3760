import React, { useState } from "react";
import axios from "axios"
import logo from "./logo.png";
import myImage from "../src/timetable.png";
import "./App.css";

function App() {
  const [course,setCourse] = useState("")
  const testapi = () => {
    axios.post("/api/searchcode/"+course).then((response) => {
      axios.get("/api/searchresults").then((data) => {
        console.log(data.data)
      });
    });
  }
  
  
  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <img src={logo} className="img-fluid" alt="logo" />
          <br></br>
          <nav className="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a
                      className="nav-link active fs-3 mr-3"
                      aria-current="page"
                      href="#home"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fs-3 mr-3" href="#courses">
                      Courses
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fs-3 mr-3" href="getdata">
                      Placeholder 1
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link fs-3 mr-3" href="#about">
                      Placeholder 2
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-xl">
          <div className="mt-4 ms-4 px-5 py-4 rounded-4 courses">
            <div className="fs-3 mt-4">Enter Desired Courses</div>
            <form className="mt-2">
              <div className="mb-3">
                <input
                  id="course1"
                  className="form-control"
                  type="text"
                  placeholder=" "
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                />
                <label for="course1" className="form-label">
                  Course 1
                </label>
              </div>
              <div className="mb-3">
                <input
                  id="course2"
                  className="form-control"
                  type="text"
                  placeholder=" "
                />
                <label for="course2" className="form-label">
                  Course 2
                </label>
              </div>
              <div className="mb-3">
                <input
                  id="course3"
                  className="form-control"
                  type="text"
                  placeholder=" "
                />
                <label for="course3" className="form-label">
                  Course 3
                </label>
              </div>
              <div className="mb-3">
                <input
                  id="course4"
                  className="form-control"
                  type="text"
                  placeholder=" "
                />
                <label for="course4" className="form-label">
                  Course 4
                </label>
              </div>
              <div className="mb-3">
                <input
                  id="course5"
                  className="form-control"
                  type="text"
                  placeholder=" "
                />
                <label for="course5" className="form-label">
                  Course 5
                </label>
              </div>
            </form>
            <div className="text-center">
              <button type="button" className="btn btn-secondary" onClick={testapi}>
                Generate Schedule

              </button>
            </div>
          </div>
        </div>
        <div className="col-xl">
          <div className="checkboxes mt-4 ms-5">
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box1"
              ></input>
              <label className="form-check-label" for="box1">
                Prefer Heavy Mornings
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box2"
              ></input>
              <label className="form-check-label" for="box2">
                Prefer Heavy Afternoons
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box3"
              ></input>
              <label className="form-check-label" for="box3">
                Prefer Heavy Evenings
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box4"
              ></input>
              <label className="form-check-label" for="box4">
                Avoid Thursdays
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box5"
              ></input>
              <label className="form-check-label" for="box5">
                Avoid Fridays
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box6"
              ></input>
              <label className="form-check-label" for="box6">
                Prefer courses with Dr. Greg
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box7"
              ></input>
              <label className="form-check-label" for="box7">
                Allow Graduate courses
              </label>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input mt-0"
                value=""
                id="box8"
              ></input>
              <label className="form-check-label" for="box8">
                Allow Courses with TBA times
              </label>
            </div>
          </div>
        </div>
        <div className="col-xl">
          <div className="mt-4 me-4">
            <img src={myImage} className="img-fluid" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
