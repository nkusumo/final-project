import { useState } from 'react';

function AddPlant() {

    const [name, setName] = useState('')
    const [sciName, setSciName] = useState('')
    const [date, setDate] = useState('')
    const [days, setDays] = useState(7)

    function decrement() {
        if (days > 1) {
            let d = days - 1
            setDays(d)
        }
    }
    
    function increment() {
        let d = days + 1
        setDays(d)
    }

    return(
        <form>
            <label>Name</label>
            <input type="text" onChange={e => setName(e.target.value)} value={name} /><br/>
            <label>Scientific Name</label>
            <input type="text" onChange={e => setSciName(e.target.value)} value={sciName} /><br/>
            <label>When was the last time you watered this plant?</label>
            <input type="date" onChange={e => setDate(e.target.value)} value={date}  /><br/>
            <label>How often do you want to water this plant? <em>Don't worry, this can be updated later</em></label>
            <input type="button" onClick={decrement} value={' - '} />
            <input type="number" onChange={e => setDays(e.target.value)} value={days} />
            <input type="button" onClick={increment} value={' + '} /><br/>
            <input type="submit" value={'Add Plant'} />
        </form>
    )
}

export default AddPlant