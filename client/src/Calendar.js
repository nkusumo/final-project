import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'

function Calendar({user}) {
    document.title = "Plant Parenthood | Calendar"
    
    const [waterings, setWaterings] = useState([])

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/users/${user.id}/waterings`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWaterings(data)
            })
        }}, [user])

    let waterArray = waterings.map(w => {
        return(
        <tr>
            <td>{w.next_watering}</td>
            <td>Water {w.name} ({w.scientific_name})</td>
        </tr>
    )})    

    return(
        <Table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>TO DO</th>
                </tr>
            </thead>
            <tbody>
                {waterArray}
            </tbody>
        </Table>
    )
}

export default Calendar