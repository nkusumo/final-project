import Button from 'react-bootstrap/Button'
import { useHistory, Link } from 'react-router-dom'

function NavBar({user, setUser}) {

    let history = useHistory()

    function handleLogout() {
        async function logout() {
            const res = await fetch("/logout", {
                method: 'DELETE'
            })
            if (res.ok) {
                setUser(null)
                history.push('/login')
            }
        }
        logout();
    }

    return(
        <div id="nav">
            Hi, {user.name}!<br/><br/>
            <Link to="/">My Plants</Link><br/><br/>
            <Link to="calendar">Calendar</Link><br/><br/>
            <Button onClick={handleLogout}>Logout</Button><br/>
        </div>
    )
}

export default NavBar;