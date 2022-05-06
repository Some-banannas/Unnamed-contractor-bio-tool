import { Button, Divider, FormControl, Paper, Slide, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useRef, useEffect } from "react"
import { MainLoginPaper } from "."
import { useRouter } from "next/router"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { LOGIN_USER, ME } from "../../client/userQueries"
import Image from 'next/image';


function LoginBox(params) {
    const route = useRouter()
    const animTimeout = 400

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

    const [animState, setAnimState] = useState({
        in: true,
    })
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
                route.push('/dashboard')
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
        setAnimState({ ...animState, in: false })
        setTimeout(() => {
            route.push("/create-new-account")

        }, animTimeout);
    }

    const handleLogin = () => {
        loginUser({ variables: { email: state.email, password: state.password } })
    }
    // ----------------------------------------------------------------------------------------------------------------------------------
    // returned component
    return (
        <MainLoginPaper variant="elevation" elevation={0} sx={{ overflowX: 'hidden' }}>
            <Stack spacing={2} >
                <Box width={100} height={100} sx={{ marginLeft: '50%', transform: 'translate(-50%,0%)' }}>
                    <Image src='/images/HeyPaulLogo.png' alt="no image" width={100} height={100} />
                </Box>
                <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                    <Typography variant="h5" >Sign in</Typography>
                </Slide>
                {showErrMsg &&
                    <Paper variant="outlined" sx={{ padding: 2 }}>
                        <Typography color='error' ref={errRef} textAlign={'center'} variant="subtitle2">{errMsg}</Typography>
                    </Paper>
                }
                <FormControl>
                    <Stack spacing={2} >
                        <Slide direction="left" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                            <TextField required value={state.email} onChange={handleEmailChanged} type='email' variant="outlined" label="Email" />
                        </Slide>

                        <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                            <TextField required value={state.password} onChange={handlePassowordChanged} type={'password'} variant="outlined" label="password" />
                        </Slide>
                        <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                            <Stack spacing={2} direction='row'>
                                <Button size="small" color="info" variant="text" >Forgot password?</Button>
                                <Box flexGrow={1} />
                            </Stack>
                        </Slide>
                        <Divider />
                        <Stack spacing={2} direction='row'>
                            <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                                <Button size="small" color="info" variant="text" onClick={handleGoToCreateAccount} >Create account</Button>
                            </Slide>
                            <Box flexGrow={1} />
                            <Slide direction="left" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                                <Button type="submit" color="primary" variant="contained" onClick={handleLogin} >Login ➔</Button>
                            </Slide>
                        </Stack>
                    </Stack>
                </FormControl>
            </Stack>
        </MainLoginPaper>
    )
}

export default LoginBox