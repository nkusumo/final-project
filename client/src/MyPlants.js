import { useEffect, useState } from 'react'
import AddPlant from './AddPlant'
import PlantCard from './PlantCard'
import Button from 'react-bootstrap/Button'

function MyPlants({user}) {
    document.title = "Plant Parenthood | My Plants"

    const [myPlants, setMyPlants] = useState([])
    const [showForm, setShowForm] = useState(false)
    console.log(user)

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/users/${user.id}/plants`)
            .then(res => res.json())
            .then(data => setMyPlants(data.reverse()))
        }
    },[user])

    function handleAddPlant(plant) {
        console.log(plant)
        plant.user_id = user.id
        console.log(plant)
        fetch('http://localhost:3000/parenthoods', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.id) {
                let updatedArray = [data, ...myPlants]
                setMyPlants(updatedArray)
            } else {
                alert(data.errors)
            }
        })
    }

    function handleDeletePlant(plant_id) {
        fetch(`http://localhost:3000/parenthoods/${plant_id}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedArray = myPlants.filter(plant => plant.id != plant_id)
            setMyPlants(updatedArray)
        })
    }
    
    function watered(date, plant_id) {
        fetch(`http://localhost:3000/parenthoods/${plant_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date: date})
        })
        .then(res => res.json())
        .then(console.log) // update myPlants --> does this need to be here???
    }

    function updateWateringInterval(days, plant_id) {
        fetch(`http://localhost:3000/parenthoods/${plant_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({watering_frequency: days})
        })
        .then(res => res.json())
        .then(console.log) // update myPlants --> does this need to be here???
    }

    let plantArray = myPlants.map(plant => <PlantCard key={plant.id} {...plant} handleDeletePlant={handleDeletePlant} watered={watered} updateWateringInterval={updateWateringInterval} />)
    console.log(myPlants)

    return(
        <>
        <Button onClick={()=>setShowForm(!showForm)}>{!showForm ? "Add a plant to my collection" : "Hide form"}</Button>
        {showForm ? <AddPlant handleAddPlant={handleAddPlant} setShowForm={setShowForm} /> : null}
        <div id="cards-container">
            {plantArray.length > 0 ? plantArray : <div>You have no plants yet!</div>}
        </div>
        </>
    )
}

export default MyPlants