import { useEffect, useState } from 'react'
import AddPlant from './AddPlant'
import PlantCard from './PlantCard'
import Button from 'react-bootstrap/Button'
import { DirectUpload } from 'activestorage'

function MyPlants({user, watered}) {
    document.title = "Plant Parenthood | My Plants"

    const [myPlants, setMyPlants] = useState([])
    const [showForm, setShowForm] = useState(false)
    console.log(user)

    useEffect(() => {
        if (user) {
            fetch(`/users/${user.id}/plants`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setMyPlants(data.reverse())
            })
        }
    },[user])

    function handleAddPlant(plant, imageObj) {
        plant.user_id = user.id
        fetch('/parenthoods', {
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
                uploadFile(imageObj, data)
            } else {
                alert(data.errors.full_messages)
            }
        })
    }

    function uploadFile(file, parenthood) {
        const upload = new DirectUpload(file, '/rails/active_storage/direct_uploads')
        upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                fetch(`/parenthoods/${parenthood.id}/attach_image`, {
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
                    let updatedArray = [data, ...myPlants]
                    setMyPlants(updatedArray)
                })
            }
        })
    }

    function handleDeletePlant(plant_id) {
        fetch(`/parenthoods/${plant_id}`, {
            method: "DELETE"
        })
        .then(() => {
            let updatedArray = myPlants.filter(plant => plant.id != plant_id)
            setMyPlants(updatedArray)
        })
    }


    function updateWateringInterval(days, plant_id) {
        fetch(`/parenthoods/${plant_id}`, {
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
    // console.log(myPlants)

    return(
        <>
        <Button variant="outline-success" onClick={()=>setShowForm(!showForm)}>{!showForm ? "Add a plant to my collection" : "Hide form"}</Button>
        {showForm ? <AddPlant handleAddPlant={handleAddPlant} setShowForm={setShowForm} /> : null}
        <div id="cards-container">
            {plantArray.length > 0 ? plantArray 
            : <div style={{marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px'}}>You have no plants yet!</div>
            }
        </div>
        </>
    )
}

export default MyPlants