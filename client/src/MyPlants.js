import { useEffect, useState } from 'react'
import AddPlant from './AddPlant'
import PlantCard from './PlantCard'

function MyPlants({user}) {
    document.title = "Plant Parenthood | My Plants"

    const [myPlants, setMyPlants] = useState([])
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
        <AddPlant />
        {plantArray.length > 0 ? plantArray : <div>You have no plants yet!</div>}
        </>
    )
}

export default MyPlants