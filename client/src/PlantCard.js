import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CloseButton from 'react-bootstrap/CloseButton'
import { useState } from 'react';
import AddLog from './AddLog'

function PlantCard({id, logs, date, image, watering_frequency, plant_name, plant_sci_name, handleDeletePlant, watered, updateWateringInterval}) {

    const [dateWatered, setDateWatered] = useState('')
    const [lastWatered, setLastWatered] = useState(date)
    const [editDays, setEditDays] = useState(false)
    const [days, setDays] = useState(watering_frequency)
    const [plantLog, setPlantLog] = useState(logs)
    
    let logArray = plantLog.map(log => <div><br/><br/>{log.date}: {log.description}<br/>hi<br/></div>)
    console.log(plantLog.reverse())
    
    let oldDate = new Date(lastWatered.split("-")).toLocaleDateString()
    
    let newDate = (previous, days) => {
        let d = new Date(previous.split("-"))
        d.setDate(d.getDate() + days)
        let test = new Date(d)
        return test.toLocaleDateString()
    }

    function handleWatering(e) {
        e.preventDefault()
        watered(dateWatered, id)
        setLastWatered(dateWatered)
    }

    function handleSubmit(e) {
        e.preventDefault()
        updateWateringInterval(days, id)
        setEditDays(false)
    }

    function handleAddLog(description, date) {
        let logObj = {description: description, date: date, parenthood_id: id}
        fetch('http://localhost:3000/logs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let updatedArray = [...plantLog, data]
            setPlantLog(updatedArray)
        })
    }

    function closeEditDays() {
        setEditDays(false)
        setDays(watering_frequency)
    }

    const contentStyle = {width: '400px'}

    return(
        <Card className="card">
            <b>{plant_name}</b>
            <img style={{width: '75%', height: 'auto', marginLeft: 'auto', marginRight: 'auto'}} src={image} alt={plant_name}/>
            <em>{plant_sci_name}</em>
            Last watered: {oldDate}<br/>
            {editDays ? 
            <form onSubmit={handleSubmit} style={{display: 'inline-block'}}>
                Water every: &nbsp;
                <input type="button" onClick={() => days > 1 ? setDays(days-1) : null} value={'-'} />
                <input type="number" onChange={e => setDays(e.target.value)} value={days}/>
                <input type="button" onClick={() => setDays(days + 1)} value={'+'} />
                &nbsp; days &nbsp;
                <Button size="sm" variant="outline-success" type="submit" style={{width: 'auto'}}>Save</Button> &nbsp;
                <CloseButton style={{width: '20px', fontSize: '12px'}} onClick={closeEditDays} />
            </form>
            :
            <div style={{display: 'inline-block', verticalAlign: 'middle'}}>
                <label>Water every: {days} days</label> &nbsp;
                <Button variant="outline-success" size="sm" style={{width: '50px'}} onClick={() => setEditDays(true)}>Edit</Button>
            </div>
            }
            Water again on: {newDate(lastWatered, days)}<br/>
            <div style={{display: 'inline-block'}}>
                <Popup trigger={<Button variant="outline-success" size="sm">Plant Diary</Button>} modal nested>
                    <Carousel>
                        {logArray}
                    </Carousel>
                    <Popup trigger={<Button size="sm">Add an update about this plant!</Button>} position="top center" {...{contentStyle}}>
                        <AddLog handleAddLog={handleAddLog} />
                    </Popup>
                </Popup> &nbsp;
                <Popup trigger={<Button variant="outline-success" size="sm">Add watering</Button>} position="top center">
                    <form onSubmit={handleWatering}>
                        <label>I watered this plant on: </label>
                        <input type="date" min={lastWatered} max={new Date().toISOString().slice(0,10)} onChange={e=>setDateWatered(e.target.value)} value={dateWatered} />
                        <input type="submit" value={'Watered'} />
                    </form>
                </Popup>
            </div>
            <hr/>
            <Button variant="outline-success" size="sm" style={{marginRight: 'auto', marginLeft: 'auto'}} onClick={()=>handleDeletePlant(id)}>Delete Plant</Button>
        </Card>
    )
}

export default PlantCard