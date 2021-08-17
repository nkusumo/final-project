import { useState } from 'react';

function AddLog({handleAddLog}) {

    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    // add photo upload
    function handleSubmit(e) {
        e.preventDefault()
        handleAddLog(description, date)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Date</label><br/>
            <input type="date" onChange={e => setDate(e.target.value)} value={date}  /><br/>
            <label>Description</label><br/>
            <textarea onChange={e => setDescription(e.target.value)} value={description} placeholder="Plant updates" style={{width: '100%'}}></textarea><br/>
            <input type="submit" value={'Add Update'} />
        </form>
    )
}

export default AddLog