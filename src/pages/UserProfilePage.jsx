import { useContext, useEffect, useState } from "react"
import { get } from "../services/authService"
import { AuthContext } from "../context/auth.context"

const UserProfilePage = () => {

    const {user} = useContext(AuthContext)
    const [thisUser, setThisUser] = useState(null)

    const fetchUser = async () => {
        try {
            const response = await get(`/users/profile/${user?._id}`)
            setThisUser(response.data)
        } catch (error) {
            console.error(error.response.data)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    


  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black font-headerFont'>
        <article className='bg-white w-96 text-center p-5'>
            <h1 className="text-xl">Your Details</h1>
            <div>
                <h2>Email: {thisUser?.email}</h2>
            </div>
            <div>
                <h2>Name: {thisUser?.name}</h2>
            </div>
            <div>
                <h2>Address:</h2>
                <p>{thisUser?.address?.street}</p>
                <span>{thisUser?.address?.city},</span>
                <span>{thisUser?.address?.state}</span>
                <p>{thisUser?.address?.zipCode}</p>
            </div>
            <div>
                <p>{thisUser?.phoneNumber}</p>
            </div>
        </article>
    </section>
  )
}

export default UserProfilePage