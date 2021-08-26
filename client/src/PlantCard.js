import { useState } from 'react';
import { DirectUpload } from 'activestorage';
import AddLog from './AddLog';
import WateringPopup from './WateringPopup';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Popup from 'reactjs-popup';
import CloseButton from 'react-bootstrap/CloseButton';

import Carousel from 'react-bootstrap/Carousel';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'reactjs-popup/dist/index.css';

function PlantCard({id, logs, date, image, watering_frequency, plant_name, plant_sci_name, handleDeletePlant, watered, updateWateringInterval}) {

    const [lastWatered, setLastWatered] = useState(date);
    const [editDays, setEditDays] = useState(false);
    const [days, setDays] = useState(watering_frequency);
    const [plantLog, setPlantLog] = useState(logs.reverse());
    const [show, setShow] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => setCarouselIndex(selectedIndex);
    
    let logArray = plantLog.map(log => {
    return(
        <Carousel.Item>
            <img className="carousel-img" src={log.image} alt={log.date} />
            <Carousel.Caption style={{backgroundColor: 'rgba(202, 243, 202, 0.4)'}}>
                <h5>{log.date}</h5>
                <hr/>
                <p>{log.description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    )})
    
    let oldDate = new Date(lastWatered.split("-")).toLocaleDateString()
    
    let newDate = (previous, days) => {
        let d = new Date(previous.split("-"))
        d.setDate(d.getDate() + days)
        let test = new Date(d)
        return test.toLocaleDateString()
    }

    function handleSubmit(e) {
        e.preventDefault()
        updateWateringInterval(days, id)
        setEditDays(false)
    }

    function handleAddLog(description, date, imageObj) {
        let logObj = {description: description, date: date, parenthood_id: id}
        fetch('/logs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logObj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.id) {
                uploadFile(imageObj, data)
            } else {
                alert(data.errors)
            }
        })
    }

    function uploadFile(file, log) {
        const upload = new DirectUpload(file, 'rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                fetch(`/logs/${log.id}/attach_image`, {
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
            <Popup open={show} className="delete-alert" trigger={<button class="material-icons" onClick={()=>setShow(!show)}>delete_outline</button>} position="left top">
                <b>Are you sure you want to delete this plant?</b>
                <Button onClick={() => handleDeletePlant(id)} variant="success" size="sm" style={{width: '100px'}}>Yes</Button>
            </Popup>
            <h5>{plant_name}</h5>
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
            <div className="card-buttons" style={{display: 'inline-block'}}>
                <Popup className="diary" trigger={<Button variant="outline-success" size="sm">Plant Diary</Button>} modal nested>
                    <Carousel activeIndex={carouselIndex} onSelect={handleSelect}>
                        {logArray}
                    </Carousel>
                    <Popup trigger={<Button variant="success" size="sm">Add an update about this plant!</Button>} position="top center" {...{contentStyle}}>
                        <AddLog handleAddLog={handleAddLog} />
                    </Popup>
                </Popup> &nbsp;
                <WateringPopup last_watered={lastWatered} watered={watered} parenthood_id={id} setLastWatered={setLastWatered} />
            </div>
        </Card>
    )
}

export default PlantCard