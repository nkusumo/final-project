import { Navbar, Container, Nav } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

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
        <Navbar>
            <Container>
            <Nav>
            {user ? 
            <>
                <Navbar.Text>Hi, {user.name}!</Navbar.Text>
                <Nav.Link href="/">My Plants</Nav.Link>
                <Nav.Link href="/calendar">Calendar</Nav.Link>
                <Button onClick={handleLogout}>Logout</Button>
            </>
            : 
            <Navbar.Text>Hi!</Navbar.Text>}
            </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;