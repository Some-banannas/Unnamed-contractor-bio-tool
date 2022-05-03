import { AppBar, Box, IconButton, Menu, Toolbar, Typography } from "@mui/material"
import CreateNewAccountBox from "../components/create-new-account/CreateNewAccountBox"
import MainPageLayout from "../components/MainPageLayout"
import theme from "../src/theme"


function Login(params) {
    return (
        <MainPageLayout PageComp={<CreateNewAccountBox />} />
    )
}

export default Login