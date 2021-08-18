import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function Login({onLogin}) {
    document.title = "Plant Parenthood | Login"

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const [showSignUp, setShowSignUp] = useState(false)
    
    let history = useHistory();

    function handleLogin(e) {
        e.preventDefault()
        async function login(){
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password }),
            })
            if (res.ok) {
                const user = await res.json()
                onLogin(user)
                history.push('/') 
            } else {
                const err = await res.json()
                setErrors(err.errors)
            }
        };
        login()
    }

    function handleSignUp(e) {
        e.preventDefault()
        setErrors([])
        async function signUp(){
            const res =  await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    password
                })
            });
            if(res.ok){
                const user = await res.json()
                onLogin(user)
                history.push('/') 
            } else {
                const err = await res.json()
                setErrors(err.errors)
            };
        };
        signUp();
    }

    function switchToSignup() {
        setShowSignUp(false)
        setUsername("")
        setPassword("")
        setErrors([])
    }

    function switchToLogin() {
        setShowSignUp(true)
        setName("")
        setUsername("")
        setPassword("")
        setErrors([])
    }

    return(
        <div className="login">
        <br/>
        {showSignUp ? 
        <>
        <form onSubmit={handleSignUp}>
            <label>Name</label>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/><br />
            <label>Username</label>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/><br />
            <label>Password</label>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
            <Button variant="success" type="submit">Create Account</Button>
        </form>
        <div style={{marginTop: "20px", color: "red"}}>{errors.map(err => <p key={err}>{err}</p>)}</div>
        <div>
            <br/>
            Already have an account?
            <Button variant="success" onClick={switchToSignup}>Login here</Button>
        </div>
        </>
        : 
        <>
        <form onSubmit={handleLogin}>
            <label>Username</label>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/><br />
            <label>Password</label>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <Button variant="success" type="submit">Login</Button>
        </form>
        <div>{errors.map(err => <p key={err}>{err}</p>)}</div>
        <div style={{verticalAlign: 'middle'}}>
            <label>Don't have an account?</label>
            <Button variant="success" onClick={switchToLogin}>Sign up here</Button>
        </div>
        </>
        }
        </div>
    )
}

export default Login;