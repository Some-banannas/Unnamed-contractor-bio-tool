import { Box, Button, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { MainModalBox } from "."
import CancelIcon from '@mui/icons-material/Cancel';
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../../client/userQueries";
import { PROFILE, UPDATE_PROFILE } from "../../../client/profileQueries";
function EditProfileModal({ open, onClose }) {

    const [error, setError] = useState({
        isError: false,
        message: ""
    })
    const [aboutMe, setAboutMe] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [jobTitle, setJobTitle] = useState("")


    const { data: meData, loading: meLoading, error: meError } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log(data.me)
            // setUserData(data.me)
            setFirstName(data.me.firstName)
            setLastName(data.me.lastName)
        }
    })
    const { data: profileData, loading: profileLoading, error: profileError } = useQuery(PROFILE, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log(data)
            setAboutMe(data.profile[0].aboutMe)
            setJobTitle(data.profile[0].jobTitle)
        }
    })

    const [updateProfile, { }] = useMutation(UPDATE_PROFILE, {
        fetchPolicy: 'network-only',
        onCompleted: () => {

        }
    })

    useEffect(() => {
        if (aboutMe.length > 1000) {
            setError({ ...error, isError: true, message: "About me can't be more that 1,000 characters" })
        } else if (error.isError) {
            setError({ ...error, isError: false, message: "" })
        }
    }, [aboutMe])


    if (meLoading || profileLoading) {
        return (
            <></>
        )
    }

    const handleAboutMeChanged = (e) => {
        setAboutMe(e.target.value)
    }
    const handleFirstNameChanged = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChanged = (e) => {
        setLastName(e.target.value)
    }
    const handleJobTitleChanged = (e) => {
        setJobTitle(e.target.value)
    }
    const handleSaveClicked = () => {
        updateProfile({ variables: { aboutMe: aboutMe, jobTitle: jobTitle } })
    }

    return (
        <Modal open={open} onClose={onClose}>
            <MainModalBox>
                <Stack spacing={2}>
                    <Stack direction={'row'}>
                        <Typography fontWeight={'light'} sx={{ color: 'lightgrey' }} variant="h5">
                            Edit your profile
                        </Typography>
                        <Box flexGrow={1} />
                        <IconButton sx={{ color: 'darkgrey' }} onClick={onClose}>
                            <CancelIcon />
                        </IconButton>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <TextField value={firstName} onChange={handleFirstNameChanged} variant="outlined" label="First Name" />
                        <TextField value={lastName} onChange={handleLastNameChanged} variant="outlined" label="Last Name" />
                    </Stack>
                    <TextField value={jobTitle} onChange={handleJobTitleChanged} variant="outlined" label="Job Title" />
                    <TextField multiline maxRows={4} value={aboutMe} onChange={handleAboutMeChanged} variant="outlined" label="About me" />
                    <Stack direction={'row'}>
                        <Box flexGrow={1} />
                        <Button disabled={meLoading || profileLoading} variant="contained" color="secondary" onClick={() => { handleSaveClicked(); onClose() }}>
                            Save
                        </Button>
                    </Stack>

                </Stack>
            </MainModalBox>
        </Modal>
    )
}


export default EditProfileModal