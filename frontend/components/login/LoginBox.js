import { Avatar, Button, Divider, FormControl, Grow, Paper, Slide, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useRef, useEffect } from "react"
import { MainLoginPaper } from "."
import { useRouter } from "next/router"
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { LOGIN_USER, ME } from "../../client/userQueries"
import Image from 'next/image';
import LockIcon from '@mui/icons-material/Lock';
import theme from "../../src/theme"

function LoginBox(params) {
    const route = useRouter()
    const animTimeout = 800

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
                route.push('/dashboard')
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
                setAnimState({ ...animState, in: false })
                setTimeout(() => {
                    route.push("/dashboard")

                }, animTimeout);
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
                {/* <Box width={100} height={100} sx={{ marginLeft: '50%', transform: 'translate(-50%,0%)' }}>
                    <Image src='/images/HeyPaulLogo.png' alt="no image" width={100} height={100} />
                </Box> */}
                <Box alignSelf={'center'}>
                    <Grow in={animState.in} timeout={animTimeout - (animTimeout / 7.0)} mountOnEnter unmountOnExit>
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                            <LockIcon />
                        </Avatar>
                    </Grow>
                </Box>
                <Grow in={animState.in} timeout={animTimeout - (animTimeout / 6.0)} mountOnEnter unmountOnExit>
                    <Typography textAlign={'center'} variant="h5" >Sign in</Typography>
                </Grow>
                {showErrMsg &&
                    <Paper variant="outlined" sx={{ padding: 2 }}>
                        <Typography color='error' ref={errRef} textAlign={'center'} variant="subtitle2">{errMsg}</Typography>
                    </Paper>
                }
                <FormControl>
                    <Stack spacing={2} >
                        <Grow in={animState.in} timeout={animTimeout - (animTimeout / 5.0)} mountOnEnter unmountOnExit>
                            <TextField required value={state.email} onChange={handleEmailChanged} type='email' variant="outlined" label="Email" />
                        </Grow>

                        <Grow in={animState.in} timeout={animTimeout - (animTimeout / 4.0)} mountOnEnter unmountOnExit>
                            <TextField required value={state.password} onChange={handlePassowordChanged} type={'password'} variant="outlined" label="password" />
                        </Grow>
                        <Grow in={animState.in} timeout={animTimeout - (animTimeout / 3.0)} mountOnEnter unmountOnExit>
                            <Stack spacing={2} direction='row'>
                                <Button size="small" color="secondary" variant="text" >Forgot password?</Button>
                                <Box flexGrow={1} />
                            </Stack>
                        </Grow>
                        {/* <Divider /> */}
                        <Stack spacing={2} direction='row'>
                            <Grow in={animState.in} timeout={animTimeout - (animTimeout / 2.0)} mountOnEnter unmountOnExit>
                                <Button size="small" color="secondary" variant="text" onClick={handleGoToCreateAccount} >Create account</Button>
                            </Grow>
                            <Box flexGrow={1} />
                            <Grow in={animState.in} timeout={animTimeout - (animTimeout / 2.0)} mountOnEnter unmountOnExit>
                                <Button type="submit" color="primary" variant="contained" onClick={handleLogin} >Login ➔</Button>
                            </Grow>
                        </Stack>
                    </Stack>
                </FormControl>
            </Stack>
        </MainLoginPaper>
    )
}

export default LoginBox