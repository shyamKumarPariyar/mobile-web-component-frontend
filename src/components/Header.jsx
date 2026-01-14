import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

axios.defaults.withCredentials = true
const Header = ({users}) => {
    const history = useNavigate();
    const [value, setValue] = useState()

    const handleLogout = async() => {
        await axios
        .post("http://localhost:8085/users/api/user-logout")
        .then(() => history("/login"))
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h4">
                        DKN
                    </Typography>
                    <Box sx={{marginLeft: "auto"}}>
                        <Tabs
                            indicatorColor="secondary"
                            onChange={(e,val) => setValue(val)}
                            value={value}
                            textColor="inherit"
                        >
                            {users ?
                                <Tab to="#" LinkComponent={Link} onClick={handleLogout} label="Logout" />
                            :
                                <Tab to="/login" LinkComponent={Link} label="Login" />
                            }
                            {/* <Tab label="Signup" /> */}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header