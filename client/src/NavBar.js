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
        <div style={{width: '25%'}}>
        <Navbar>
            <Container>
            <Nav>
            {user ? 
            <>
                <Navbar.Text>Hi, {user.name}!</Navbar.Text><br/>
                <Nav.Link href="/">My Plants</Nav.Link><br/>
                <Button onClick={handleLogout}>Logout</Button><br/>
            </>
            : 
            <Nav.Link href="/login">Login</Nav.Link>}
            </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default NavBar;