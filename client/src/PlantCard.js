// import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function PlantCard({id, logs, date, image, plant}) {
    
    let logArray = logs.map(log => <div>{log.date}: {log.description}</div>)

    return(
        <Card className="card">
            <br/>
            <img style={{height: '50%', width: '50%'}} src={image} alt={plant.name}/><br/>
            <b>{plant.name}</b><br/>
            <em>{plant.scientific_name}</em><br/>
            Last watered: {date}<br/>
            <Popup trigger={<Button size="sm">Open details</Button>} modal>
                <Carousel>
                    {logArray}
                </Carousel>
            </Popup>
        </Card>
    )
}

export default PlantCard