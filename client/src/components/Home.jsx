import { useNavigate } from "react-router-dom"
import AllCampaign from "./AllCampaign"

export default function Home(){
    const navigate=useNavigate()
    return(
        <>
            <AllCampaign/>
        </>
    )
}