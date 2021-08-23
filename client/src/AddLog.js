import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function AddLog({handleAddLog}) {

    const [description, setDescription] = useState('')
    const [image, setImage] = useState({})
    const [date, setDate] = useState('')
    // add photo upload

    function handleSubmit(e) {
        e.preventDefault()
        handleAddLog(description, date, image)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" max={new Date().toISOString().slice(0,10)} onChange={e => setDate(e.target.value)} value={date} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" onChange={e => setDescription(e.target.value)} value={description} placeholder="Plant updates" />
            </Form.Group>
            <Form.Group>
                    <Form.Label>Plant Image</Form.Label>
                    <Form.Control type="file" onChange={e => setImage(e.target.files[0])}/>
                </Form.Group>
            <Button variant="success" type="submit">Add Update</Button>
        </Form>
    )
}

export default AddLog