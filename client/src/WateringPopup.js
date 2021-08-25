import { useState } from 'react';
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function WateringPopup({lastWatered, watered, parenthood_id, setLastWatered}) {
    
    const [dateWatered, setDateWatered] = useState('')

    function handleWatering(e) {
        e.preventDefault()
        watered(dateWatered, parenthood_id)
        setLastWatered(dateWatered)
    }

    return(
        <Popup trigger={<Button variant="outline-success" size="sm">Water Plant</Button>} position="top center">
            <Form onSubmit={handleWatering}>
                <Form.Label>I watered this plant on: </Form.Label>
                <Form.Control type="date" min={lastWatered} max={new Date().toISOString().slice(0,10)} onChange={e=>setDateWatered(e.target.value)} value={dateWatered} />
                <Button variant="success" size="sm" type="submit">Watered</Button>
            </Form>
        </Popup>
    )
}

export default WateringPopup