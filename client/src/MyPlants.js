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

    let plantArray = myPlants.map(plant => <PlantCard key={plant.id} {...plant} />)
    // let plantArray = myPlants.map(plant => {
    //     return(
    //     <div key={plant.id}>
    //         <br/>
    //         <img style={{height: '25%', width: '25%'}} src={plant.image} alt={plant.plant.name}/><br/>
    //         <b>{plant.plant.name}</b><br/>
    //         <em>{plant.plant.scientific_name}</em><br/>
    //         Acquired: {plant.date}<br/>
    //     </div>
    //     )
    // })
    console.log(myPlants)
    

    return(
        <>
        <Button onClick={()=>setShowForm(!showForm)}>{!showForm ? "Add a plant to my collection" : "Hide form"}</Button>
        {showForm ? <AddPlant /> : null}
        <div id="cards-container">
            {plantArray.length > 0 ? plantArray : <div>You have no plants yet!</div>}
        </div>
        </>
    )
}

export default MyPlants