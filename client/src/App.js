import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import MyPlants from './MyPlants';
import Login from './Login';
import Calendar from './Calendar';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/current_user")
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <MyPlants user={user} />
        </Route>
        <Route exact path="/login">
          <Login onLogin={setUser} />
        </Route>
        <Route exact path="/calendar">
          <Calendar />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
