import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function AddPlant({handleAddPlant, setShowForm}) {

    const [name, setName] = useState('')
    const [sciName, setSciName] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [days, setDays] = useState(7)

    function handleSubmit(e) {
        e.preventDefault()
        let plantObj = {plant_name: name, date: date, watering_frequency: days, image: image, plant_sci_name: sciName}
        handleAddPlant(plantObj)
        setName('')
        setSciName('')
        setImage('')
        setDate('')
        setDays(7)
        setShowForm(false)
    }

    return(
        <div id="form-container">
            <Form id="add-form" onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g., fiddle leaf fig" onChange={e => setName(e.target.value)} value={name} />
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Scientific Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g., Ficus lyrata" onChange={e => setSciName(e.target.value)} value={sciName} />
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" onChange={e => setImage(e.target.value)} value={image}  />
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>When was the last time you watered this plant?</Form.Label>
                    <Form.Control type="date" max={new Date().toISOString().slice(0,10)} onChange={e => setDate(e.target.value)} value={date}  />
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>How often do you want to water this plant?</Form.Label>
                    <Form.Control style={{width: 'fit-content'}} type="button" onClick={() => days > 1 ? setDays(days-1) : null} value={' - '} />
                    <Form.Control type="number" onChange={e => setDays(e.target.value)} value={days} />
                    <Form.Control style={{width: 'fit-content'}} type="button" onClick={() => setDays(days + 1)} value={' + '} /><br/>
                    <Form.Text>Don't worry, this can be updated later</Form.Text>
                </Form.Group>
                <Button style={{marginLeft: 'auto', marginRight: 'auto'}} variant="success" type="submit">Add Plant</Button>
            </Form>
        </div>
    )
}

export default AddPlant
// <label>Name</label>
// <input type="text" onChange={e => setName(e.target.value)} value={name} /><br/>
// <label>Scientific Name</label>
// <input type="text" onChange={e => setSciName(e.target.value)} value={sciName} /><br/>
// <label>Image URL</label>
// <input type="text" onChange={e => setImage(e.target.value)} value={image} /><br/>
// <label>When was the last time you watered this plant?</label>
// <input type="date" onChange={e => setDate(e.target.value)} value={date}  /><br/>
// <label>How often do you want to water this plant? <em>Don't worry, this can be updated later</em></label>
// <input type="button" onClick={() => days > 1 ? setDays(days-1) : null} value={' - '} />
// <input type="number" onChange={e => setDays(e.target.value)} value={days} />
// <input type="button" onClick={() => setDays(days + 1)} value={' + '} /><br/>
// <input type="submit" value={'Add Plant'} />