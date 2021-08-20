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

        console.log(waterings)

    let waterArray = waterings.map(w => {
        if (w.due == "overdue") {
            return(
                <tr style={{borderColor: 'red', borderWidth: '3px', backgroundColor: 'pink'}}>
                    <td>{w.next_watering}</td>
                    <td>Water {w.name} <small><em>({w.scientific_name})</em></small></td>
                </tr>
            )
        } else if (w.due == "today") {
            return(
                <tr style={{borderColor: 'green', borderWidth: '3px', backgroundColor: '#34871952'}}>
                    <td>{w.next_watering}</td>
                    <td>Water {w.name} <small><em>({w.scientific_name})</em></small></td>
                </tr>
            )
        } else {
            return(
                <tr>
                    <td>{w.next_watering}</td>
                    <td>Water {w.name} <small><em>({w.scientific_name})</em></small></td>
                </tr>
            )
        }    
    })    

    return(
        <>
        <h1>Water Your Plants!</h1>
        {waterings.length > 0 ? 
        <Table bordered style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
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
        :
        <div style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px'}}>You have no plants to water!</div>
        }
        </>
    )
}

export default Calendar