import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import MyPlants from './MyPlants';
import Login from './Login';
import Calendar from './Calendar';
import Header from './Header';

function App() {

  // let testUser = {}
  // const [user, setUser] = useState({id: 4, name: "Delana", username: "Delana26"});
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/current_user")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUser(data)})
  },[])

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <Header />
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route exact path="/">
            <MyPlants user={user} />
          </Route>
          {/* <Route exact path="/login">
            <Login onLogin={setUser} />
          </Route> */}
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
