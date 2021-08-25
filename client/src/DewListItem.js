import { useState } from "react"
import WateringPopup from "./WateringPopup"

function DewListItem({watered, name, scientific_name, last_watered, date, next_watering, due, parenthood_id}) {

    const [lastWatered, setLastWatered] = useState(last_watered)

    return(
        <>
        <tr className={due}>
            <td>{next_watering}</td>
            <td>Water {name} <small><em>({scientific_name})</em></small></td>
            <td>
            <WateringPopup lastWatered={lastWatered} watered={watered} parenthood_id={parenthood_id} setLastWatered={setLastWatered} />
            </td>
        </tr>
        </>
    )    
}

export default DewListItem;