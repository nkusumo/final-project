import { useState } from 'react';
import { DirectUpload } from 'activestorage'
import AddLog from './AddLog'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'reactjs-popup/dist/index.css';

function PlantCard({id, logs, date, image, watering_frequency, plant_name, plant_sci_name, handleDeletePlant, watered, updateWateringInterval}) {

    const [dateWatered, setDateWatered] = useState('')
    const [lastWatered, setLastWatered] = useState(date)
    const [editDays, setEditDays] = useState(false)
    const [days, setDays] = useState(watering_frequency)
    const [plantLog, setPlantLog] = useState(logs.reverse())
    const [show, setShow] = useState(false);
    
    let logArray = plantLog.map(log => {
    return(
        <>
        <img src={log.image} alt={log.date} />
        <h3>{log.date}</h3>
        <h5>Description:</h5>
        <p>{log.description}</p>
        </>
    )})
    
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
        // on submit, close popup
        updateWateringInterval(days, id)
        setEditDays(false)
    }

    // function handleAddLog(description, date) {
    //     let logObj = {description: description, date: date, parenthood_id: id}
    //     fetch('http://localhost:3000/logs', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(logObj)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         let updatedArray = [...plantLog, data]
    //         setPlantLog(updatedArray)
    //     })
    // }
    function handleAddLog(description, date, imageObj) {
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
            if (data.id) {
                uploadFile(imageObj, data)
                // let updatedArray = [...plantLog, data]
                // setPlantLog(updatedArray)
            } else {
                alert(data.errors)
            }
        })
    }

    function uploadFile(file, log) {
        const upload = new DirectUpload(file, 'http://localhost:3000/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                fetch(`http://localhost:3000/logs/${log.id}/attach_image`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({plant_image: blob.signed_id})
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    let updatedArray = [data, ...plantLog]
                    setPlantLog(updatedArray)
                })
            }
        })
    }

    function closeEditDays() {
        setEditDays(false)
        setDays(watering_frequency)
    }

    const contentStyle = {width: '400px'}

    return(
        <Card className="card">
            <Popup className="delete-alert" trigger={<button class="material-icons" onClick={()=>setShow(!show)}>delete_outline</button>} position="left top">
                <b>Are you sure you want to delete this plant?</b>
                <br/>
                <div className="delete-btns" style={{display: 'inline-block'}}>
                <Button onClick={() => handleDeletePlant(id)} variant="success" size="sm">Yes</Button>
                {/* add onclick close popup */}
                <Button variant="success" size="sm">No</Button>
                </div>
            </Popup>
            {/* <button class="material-icons" onClick={()=>setShow(!show)}>delete_outline</button>
            <Alert className="delete-alert" show={show} variant="secondary">
                <b>Are you sure you want to delete this plant?</b>
                <Button onClick={() => handleDeletePlant(id)} variant="outline-success" size="sm">Yes</Button>
                <Button onClick={() => setShow(false)} variant="outline-success" size="sm">No</Button>
            </Alert> */}
            <b>{plant_name}</b>
            <img src={image} alt={plant_name}/>
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
                <Popup classname="diary" trigger={<Button variant="outline-success" size="sm">Plant Diary</Button>} modal nested>
                    <Carousel>
                        {logArray}
                    </Carousel>
                    <Popup trigger={<Button variant="success" size="sm">Add an update about this plant!</Button>} position="top center" {...{contentStyle}}>
                        <AddLog handleAddLog={handleAddLog} />
                    </Popup>
                </Popup> &nbsp;
                <Popup trigger={<Button variant="outline-success" size="sm">Water Plant</Button>} position="top center">
                    <Form onSubmit={handleWatering}>
                        <Form.Label>I watered this plant on: </Form.Label>
                        <Form.Control type="date" min={lastWatered} max={new Date().toISOString().slice(0,10)} onChange={e=>setDateWatered(e.target.value)} value={dateWatered} />
                        <Button variant="success" size="sm" type="submit">Watered</Button>
                    </Form>
                </Popup>
            </div>
        </Card>
    )
}

export default PlantCard