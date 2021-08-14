import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function PlantCard({date, image, plant}) {

    const [renderPopUp, setRenderPopUp] = useState(false)

    return(
        <Card>
            <br/>
            <img style={{height: '25%', width: '25%'}} src={image} alt={plant.name}/><br/>
            <b>{plant.name}</b><br/>
            <em>{plant.scientific_name}</em><br/>
            Acquired: {date}<br/>
            <Popup trigger={<Button size="sm">Open details</Button>} modal>
                <Carousel>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </Carousel>
            </Popup>
        </Card>
    )
}

export default PlantCard