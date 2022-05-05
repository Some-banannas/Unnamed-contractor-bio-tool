import { Button, Divider, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useRef, useEffect } from "react"
import { MainLoginPaper } from "."
import { useRouter } from "next/router"


function LoginBox(params) {
    const route = useRouter()
    // ----------------------------------------------------------------------------------------------------------------------------------
    // State

    const errRef = useRef();

    const [state, setState] = useState({
        email: "",
        password: "",
    })

    // ----------------------------------------------------------------------------------------------------------------------------------
    // logic
    const handleEmailChanged = (e) => {
        setState({ ...state, email: e.target.value })
    }
    const handlePassowordChanged = (e) => {
        setState({ ...state, password: e.target.value })
    }

    const handleGoToCreateAccount = () => {
        route.push("/create-new-account")
    }
    // ----------------------------------------------------------------------------------------------------------------------------------
    // returned component
    return (
        <MainLoginPaper variant="elevation" elevation={0}>
            <Stack spacing={2} >
                <Typography textAlign={'center'} variant="h4"  >Hey Paul!</Typography>
                <Typography textAlign={'center'} variant="h5" color='primary' >Sign in</Typography>
                <TextField required value={state.email} onChange={handleEmailChanged} type='email' variant="outlined" label="Email" />
                <TextField required value={state.password} onChange={handlePassowordChanged} type={'password'} variant="outlined" label="password" />
                <Stack spacing={2} direction='row'>
                    <Button size="small" color="info" variant="text" >Forgot password?</Button>
                    <Box flexGrow={1} />
                </Stack>
                <Divider />
                <Stack spacing={2} direction='row'>
                    <Button size="small" color="info" variant="text" onClick={handleGoToCreateAccount} >Create account</Button>
                    <Box flexGrow={1} />
                    <Button color="primary" variant="contained" >Login ➔</Button>
                </Stack>
            </Stack>
        </MainLoginPaper>
    )
}

export default LoginBox