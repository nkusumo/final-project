import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import MyPlants from './MyPlants';
import Login from './Login';
import Calendar from './Calendar';
import Header from './Header';
import Footer from './Footer';

function App() {

  const [user, setUser] = useState(null);
  const [updateCalendar, setUpdateCalendar] = useState(0)


  useEffect(() => {
    fetch("/current_user")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUser(data)})
  },[])

      
  function watered(date, plant_id) {
    fetch(`/parenthoods/${plant_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({date: date})
    })
    .then(res => res.json())
    .then(data => {
      setUpdateCalendar(prevState => prevState + 1)

    })
}

  // if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <Header />
      {!user ? 
      <Login onLogin={setUser} />
      :
      <div className="App">
        <NavBar user={user} setUser={setUser} />
        <main>
          <Switch>
            <Route exact path="/">
              <MyPlants user={user} watered={watered}/>
            </Route>
            <Route exact path="/login">
              <Login onLogin={setUser} />
            </Route>
            <Route exact path="/calendar">
              <Calendar user={user} watered={watered} updateCalendar={updateCalendar} />
            </Route>
          </Switch>
        </main>
      </div>
      }
      <Footer />
    </>
  );
}

export default App;
