import AuthContext from "../context/AuthContext"
import { useContext } from "react"

const Merchant = () => {
    const {auth} = useContext(AuthContext);
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-complement font-inter">
            <h1 className="text-4xl text-primary mb-6 font-lora font-bold">Merchant</h1>
            <p className="text-lg text-secondary font-bold">{auth.firstName}</p>
        </div>
    )
}

export default Merchant