import { AppBar, Button, Divider, FormControl, Paper, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useRef, useEffect } from "react"
import { MainCreateNewAccountBox } from "./index"
import { useRouter } from "next/router"
import { setRequestMeta } from "next/dist/server/request-meta"
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, Login_User, ME } from "../../client/userQueries"

function CreateNewAccountBox(params) {
    const route = useRouter()
    // ----------------------------------------------------------------------------------------------------------------------------------
    // State
    const errRef = useRef()
    const emailRef = useRef()

    const [state, setState] = useState({
        email: "",
        password: "",
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

    const handleGoToLogin = () => {
        route.push("/login")
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
        createUser({ variables: { email: state.email, password: state.password } })
    }

    // ----------------------------------------------------------------------------------------------------------------------------------
    // returned component

    return (
        <MainCreateNewAccountBox variant="elevation" elevation={0} >
            <Stack spacing={2} >
                <Typography textAlign={'center'} variant="h4"  >Hey Paul!</Typography>
                <Typography textAlign={'center'} variant="h5"  >Sign in</Typography>
                {showErrMsg &&
                    <Paper variant="outlined" sx={{ padding: 2 }}>
                        <Typography color='error' ref={errRef} textAlign={'center'} variant="subtitle2">{errMsg}</Typography>
                    </Paper>
                }
                <TextField autoComplete="off" required value={state.email} onChange={handleEmailChanged} type='email' variant="outlined" label="Email" />
                <TextField autoComplete="off" required value={state.password} onChange={handlePassowordChanged} type={'password'} variant="outlined" label="Password" />
                <TextField autoComplete="off" required value={state.checkPWD} onChange={handleCheckPassowordChanged} type={'password'} variant="outlined" label="Confirm Password" />
                <Box flexGrow={1} />
                <Divider />
                <Stack spacing={2} direction='row'>
                    <Button size="small" color="info" variant="text" onClick={handleGoToLogin} >Login here</Button>
                    <Box flexGrow={1} />
                    <Button color="primary" variant="contained" onClick={handleCreateAccountClicked} >Create Account ➔</Button>
                </Stack>
            </Stack>
        </MainCreateNewAccountBox >
    )
}

export default CreateNewAccountBox