import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true
const Welcome = ({users, setUsers}) => {
    const history = useNavigate();
    const sendRequest = async () => {
        await axios.get('http://localhost:8085/users/api/user-loggedin', {
            withCredentials: true
        })

        .then((result) => {
            const {user} = result.data
            setUsers(user)
        })
        .catch(err => {
            if(err.status === 404) {
                history("/login")
            }
        })
    }

    useEffect(() => {
        sendRequest()
    },[])

  return (
    <div>
        <h2>Welcome here !!</h2>
        {users && 
            <h1>{users.name}</h1>
        }
    </div>
  )
}

export default Welcome