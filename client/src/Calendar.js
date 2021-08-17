import { useState, useEffect } from 'react'

function Calendar({user}) {
    document.title = "Plant Parenthood | Calendar"
    
    const [waterings, setWaterings] = useState([])
    console.log('hello??')

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/users/${user.id}/waterings`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWaterings(data)
            })
        }}, [user])

    return(
        <>
        {waterings.map(w => <div>{w.name} ({w.scientific_name}): {w.next_watering}</div>)}
        </>
    )
}

export default Calendar