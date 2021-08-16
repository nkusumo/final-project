import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CloseButton from 'react-bootstrap/CloseButton'
import { useState } from 'react';

function PlantCard({id, logs, date, image, watering_frequency, plant_name, plant_sci_name, handleDeletePlant, watered}) {

    const [dateWatered, setDateWatered] = useState('')
    const [lastWatered, setLastWatered] = useState(date)
    
    let logArray = logs.map(log => <div>{log.date}: {log.description}</div>)
    
    let oldDate = new Date(lastWatered.split("-")).toLocaleDateString()
    
    let newDate = (previous, days) => {
        let d = new Date(previous.split("-"))
        d.setDate(d.getDate() + days)
        let test = new Date(d)
        return test.toLocaleDateString()
    }
    // console.log(new Date(date), newDate(date, watering_frequency))

    function handleWatering(e) {
        e.preventDefault()
        watered(dateWatered, id)
        setLastWatered(dateWatered)
    }
    // console.log(id)

    return(
        <Card className="card">
            <CloseButton style={{float: "right", fontSize: "18px"}} onClick={()=>handleDeletePlant(id)} /><br/>
            <img style={{width: '75%', height: 'auto', marginLeft: 'auto', marginRight: 'auto'}} src={image} alt={plant_name}/><br/>
            <b>{plant_name}</b>
            <em>{plant_sci_name}</em>
            Last watered: {oldDate}<br/>
            <label>Water every: {watering_frequency} days</label>
            <Button size="sm" style={{width: '15%'}}>Edit</Button>
            Water again on: {newDate(lastWatered, watering_frequency)}<br/>
            <Popup trigger={<Button size="sm">Open details</Button>} modal>
                <Carousel>
                    {logArray}
                </Carousel>
            </Popup>
            <Popup trigger={<Button size="sm">Add Watering</Button>} position="top center">
                <form onSubmit={handleWatering}>
                    <label>I watered this plant on: </label>
                    <input type="date" min={lastWatered} max={new Date().toISOString().slice(0,10)} onChange={e=>setDateWatered(e.target.value)} value={dateWatered} />
                    <input type="submit" value={'Watered'} />
                </form>
            </Popup>
        </Card>
    )
}

export default PlantCard