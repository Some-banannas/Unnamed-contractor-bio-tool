import { Button, Divider, FormControl, Paper, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useRef, useEffect } from "react"
import { MainLoginPaper } from "."
import { useRouter } from "next/router"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { LOGIN_USER, ME } from "../../client/userQueries"


function LoginBox(params) {
    const route = useRouter()
    // ----------------------------------------------------------------------------------------------------------------------------------
    // State

    const errRef = useRef();

    const [state, setState] = useState({
        email: "",
        password: "",
        logged: false
    })

    const [showErrMsg, setShowErrMsg] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    // ----------------------------------------------------------------------------------------------------------------------------------
    // logic

    useEffect(() => {
        setErrMsg('')
        setShowErrMsg(false)
    }, [state.email, state.password])

    const { } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log("Logged In", data)
            if (data.me !== null) {
                console.log("Logged In", data)

            }
        }
    })
    const [loginUser, { }] = useMutation(LOGIN_USER, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data.loginUser.errors) {
                setShowErrMsg(true)
                setErrMsg(data.loginUser.errors[0].message)
            } else {

            }
        }
    })

    const handleEmailChanged = (e) => {
        setState({ ...state, email: e.target.value })
    }
    const handlePassowordChanged = (e) => {
        setState({ ...state, password: e.target.value })
    }

    const handleGoToCreateAccount = () => {
        route.push("/create-new-account")
    }

    const handleLogin = () => {
        loginUser({ variables: { email: state.email, password: state.password } })
    }
    // ----------------------------------------------------------------------------------------------------------------------------------
    // returned component
    return (
        <MainLoginPaper variant="elevation" elevation={0}>
            <Stack spacing={2} >
                <Typography textAlign={'center'} variant="h4"  >Hey Paul!</Typography>
                <Typography textAlign={'center'} variant="h5" color='primary' >Sign in</Typography>
                {showErrMsg &&
                    <Paper variant="outlined" sx={{ padding: 2 }}>
                        <Typography color='error' ref={errRef} textAlign={'center'} variant="subtitle2">{errMsg}</Typography>
                    </Paper>
                }
                <FormControl>
                    <Stack spacing={2} >
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
                            <Button type="submit" color="primary" variant="contained" onClick={handleLogin} >Login ➔</Button>
                        </Stack>
                    </Stack>
                </FormControl>
            </Stack>
        </MainLoginPaper>
    )
}

export default LoginBox