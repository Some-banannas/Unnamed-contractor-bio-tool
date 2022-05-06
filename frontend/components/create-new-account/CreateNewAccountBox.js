import { AppBar, Button, Divider, FormControl, Paper, Slide, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useRef, useEffect } from "react"
import { MainCreateNewAccountBox } from "./index"
import { useRouter } from "next/router"
import { setRequestMeta } from "next/dist/server/request-meta"
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, Login_User, ME } from "../../client/userQueries"
import Image from 'next/image';

function CreateNewAccountBox(params) {
    const route = useRouter()
    // ----------------------------------------------------------------------------------------------------------------------------------
    // State
    const errRef = useRef()
    const emailRef = useRef()
    const animTimeout = 400

    const logoWidth = 100

    const [state, setState] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        checkPWD: "",
        validEmail: true,
        emailFocus: false,
        validPassword: true,
        validMatch: true,
        matchFocus: false,
    })

    const [errMsg, setErrMsg] = useState('')
    const [showErrMsg, setShowErrMsg] = useState(false)
    const [success, setSuccess] = useState(false)

    const [animState, setAnimState] = useState({
        in: true,
    })

    useEffect(() => {
        // emailRef.current.focus()
    }, [])

    useEffect(() => {

        const result = EMAIL_REGEX.test(state.email)

        setState({ ...state, validEmail: result })
    }, [state.email])

    useEffect(() => {
        const result = PWD_REGEX.test(state.password)
        const match = state.password === state.checkPWD
        setState({ ...state, validMatch: match, validPassword: result })

    }, [state.password, state.checkPWD])

    useEffect(() => {
        setErrMsg('')
        setShowErrMsg(false)
    }, [state.email, state.password, state.checkPWD])

    const [createUser, { data, loading }] = useMutation(CREATE_USER, {

        onCompleted: (data) => {
            if (data.createUser.errors) {
                setShowErrMsg(true)
                setErrMsg(data.createUser.errors[0].message)
            } else {
                route.push("/login")
            }
            // console.log("Created user", data)
        }
    })

    // ----------------------------------------------------------------------------------------------------------------------------------
    // logic
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    const handleEmailChanged = (e) => {
        setState({ ...state, email: e.target.value })
    }

    const handlePassowordChanged = (e) => {
        setState({ ...state, password: e.target.value })
    }

    const handleCheckPassowordChanged = (e) => {
        setState({ ...state, checkPWD: e.target.value })
    }
    const handleCheckFirstNameChanged = (e) => {
        setState({ ...state, firstName: e.target.value })
    }
    const handleCheckLasttNameChanged = (e) => {
        setState({ ...state, lastName: e.target.value })
    }

    const handleGoToLogin = () => {
        setAnimState({ ...animState, in: false })
        setTimeout(() => {
            route.push("/login")
        }, animTimeout);
    }

    const handleCreateAccountClicked = () => {
        // console.log(state)
        if (!state.validEmail) {
            const result = EMAIL_REGEX.test(state.email)
            if (!result) {
                setShowErrMsg(true)
                setErrMsg("The email given is invalid")
                return
            }
        }
        if (!state.validPassword) {
            setShowErrMsg(true)
            setErrMsg("Password must be 8 characters long, contain a number and a capital letter")
            return
        }
        if (!state.validMatch) {
            setShowErrMsg(true)
            setErrMsg("Passwords don't match")
            return
        }
        createUser({ variables: { email: state.email, password: state.password, firstName: state.firstName, lastName: state.lastName } })
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // returned component

    return (
        <MainCreateNewAccountBox variant="elevation" elevation={0} sx={{ overflowX: 'hidden' }}>
            <Stack spacing={2} >
                {/* <Typography textAlign={'center'} variant="h4"  >Hey Paul!</Typography> */}

                <Box width={100} height={100} sx={{ marginLeft: '50%', transform: 'translate(-50%,0%)' }}>
                    <Image src='/images/HeyPaulLogo.png' alt="no image" width={100} height={100} />
                </Box>
                <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                    <Typography variant="h5"  >Create new account</Typography>
                </Slide>
                {showErrMsg &&
                    <Paper variant="outlined" sx={{ padding: 2 }}>
                        <Typography color='error' ref={errRef} textAlign={'center'} variant="subtitle2">{errMsg}</Typography>
                    </Paper>
                }
                <Stack direction={'row'} spacing={1}>
                    <Slide direction="left" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                        <TextField value={state.firstName} onChange={handleCheckFirstNameChanged} variant="outlined" label="First Name" />
                    </Slide>
                    <Slide direction="left" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                        <TextField value={state.lastName} onChange={handleCheckLasttNameChanged} variant="outlined" label="Last Name" />
                    </Slide>
                </Stack>
                <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                    <TextField autoComplete="off" required value={state.email} onChange={handleEmailChanged} type='email' variant="outlined" label="Email" />
                </Slide>
                <Slide direction="left" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                    <TextField autoComplete="off" required value={state.password} onChange={handlePassowordChanged} type={'password'} variant="outlined" label="Password" />
                </Slide>
                <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                    <TextField autoComplete="off" required value={state.checkPWD} onChange={handleCheckPassowordChanged} type={'password'} variant="outlined" label="Confirm Password" />
                </Slide>
                <Box flexGrow={1} />
                <Divider />
                <Stack spacing={2} direction='row'>
                    <Slide direction="right" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                        <Button size="small" color="info" variant="text" onClick={handleGoToLogin} >Login here</Button>
                    </Slide>
                    <Box flexGrow={1} />
                    <Slide direction="left" in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                        <Button color="primary" variant="contained" onClick={handleCreateAccountClicked} >Create Account ➔</Button>
                    </Slide>
                </Stack>
            </Stack>
        </MainCreateNewAccountBox >
    )
}

export default CreateNewAccountBox