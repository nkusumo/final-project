import { useState } from 'react';

function AddLog() {

    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    // add photo upload

    return(
        <form>
            <label>Date</label>
            <input type="date" onChange={e => setDate(e.target.value)} value={date}  /><br/>
            <label>Description</label>
            <input type="text" onChange={e => setDescription(e.target.value)} value={description} placeholder="Plant updates" /><br/>
            <input type="submit" value={'Add Update'} />
        </form>
    )
}

export default AddLog