import { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)} value={name} /><br/>
            <label>Scientific Name</label>
            <input type="text" onChange={e => setSciName(e.target.value)} value={sciName} /><br/>
            <label>Image URL</label>
            <input type="text" onChange={e => setImage(e.target.value)} value={image} /><br/>
            <label>When was the last time you watered this plant?</label>
            <input type="date" onChange={e => setDate(e.target.value)} value={date}  /><br/>
            <label>How often do you want to water this plant? <em>Don't worry, this can be updated later</em></label>
            <input type="button" onClick={() => days > 1 ? setDays(days-1) : null} value={' - '} />
            <input type="number" onChange={e => setDays(e.target.value)} value={days} />
            <input type="button" onClick={() => setDays(days + 1)} value={' + '} /><br/>
            <input type="submit" value={'Add Plant'} />
        </form>
    )
}

export default AddPlant