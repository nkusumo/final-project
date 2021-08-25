import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import DewListItem from './DewListItem';

function Calendar({user, watered, updateCalendar}) {
    document.title = "Plant Parenthood | Calendar"
    
    const [waterings, setWaterings] = useState([])

    useEffect(() => {
        if (user) {
            fetch(`/users/${user.id}/waterings`)
            .then(res => res.json())
            .then(data => setWaterings(data))
        }}, [user, updateCalendar])

    let waterArray = waterings.map(w => <DewListItem key={w.name} watered={watered} {...w} />)

    return(
        <>
        <h1>Water Your Plants!</h1>
        {waterings.length > 0 ? 
        <div>
        <Table id="water-table" bordered style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', borderWidth: '2px'}}>
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
        <hr/>
        <Table bordered style={{width: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>
            <tbody>
                <tr>
                    <td style={{width: '100px', borderWidth: '1px'}}><b><small>Legend</small></b></td>
                    <td style={{borderColor: 'red', borderWidth: '3px', backgroundColor: 'pink', padding: '5px'}}><small>This plant needed to be watered!</small></td>
                    <td style={{borderColor: 'green', borderWidth: '3px', backgroundColor: '#34871952', padding: '5px'}}><small>Water this plant today :)</small></td>
                    <td style={{borderColor: 'lightgrey', borderWidth: '1px', padding: '5px'}}><small>This plant is ok!</small></td>
                </tr>
            </tbody>
        </Table>
        </div>
        :
        <div style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px'}}>You have no plants to water!</div>
        }
        </>
    )
}

export default Calendar