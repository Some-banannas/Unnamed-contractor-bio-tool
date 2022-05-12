import { MissingFieldError, useMutation, useQuery } from "@apollo/client"
import { Box, Button, Divider, Grow, IconButton, Stack, Typography } from "@mui/material"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { BioMainBox, ContentBoxFullHeight, ContentBoxHalfHeight, MainDashboardContainer, MainDashboardContainerLeft, MainDashboardContainerRight, MainDashboardStack } from "."
import theme from "../../src/theme"
import eventBus from "../EventBus"
import EditIcon from '@mui/icons-material/Edit';
import { ME } from "../../client/userQueries"
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import { PROFILE, UPDATE_PROFILE } from "../../client/profileQueries"
import EditProfileModal from "../modals/EditProfile/EditProfileModal"


function DashboardComp(params) {
    const [animTimeout, setAnimTimeout] = useState(500)
    const [animState, setAnimState] = useState({
        in: true,
    })
    const [userData, setUserData] = useState({})
    const [profile, setProfile] = useState({})
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
    // const [count, setCount] = useState(0)

    const mainRef = useRef(null)

    const { data: meData, loading: meLoading, error: meError } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log(data.me)
            setUserData(data.me)
        }
    })
    const { data: profileData, loading: profileLoading, error: profileError } = useQuery(PROFILE, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log(data)
            setProfile(data.profile[0])
        }
    })



    function handleLogout(e) {
        // console.log(count + 1)
        // eventBus.remove("logout")
        setAnimState({ ...animState, in: false })
        setAnimTimeout(e.animwait)
        // setCount(count + 1)
    }


    useEffect(() => {
        // if (!mainRef.current || mainRef == null) { return }
        eventBus.on('logout', (e) => { handleLogout(e) })
        // console.log('herhherhr')
        // mainRef.current.addEventListener("logout", handleLogout)
        return () => {
            eventBus.remove("logout")
        };
    }, [])


    const handleCloseEditProfileModal = () => {
        setOpenEditProfileModal(false)
    }

    if (meLoading || profileLoading) {
        return (
            <></>
        )
    }

    // console.log(profile)

    return (
        < >
            <EditProfileModal open={openEditProfileModal} onClose={handleCloseEditProfileModal} />
            <MainDashboardContainer ref={mainRef}>
                <MainDashboardStack direction={'row'} sx={{ width: '100%', height: '100%' }}>
                    <Grow in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                        <MainDashboardContainerRight>
                            <Stack sx={{ width: '100%', height: '100%', padding: 1, overflowY: 'auto' }}>
                                <ContentBoxFullHeight sx={{ marginTop: 2 }}>
                                    <Stack spacing={1}>
                                        <Stack direction={'row'}>
                                            <Typography sx={{ color: 'lightgrey' }} fontWeight={'Light'} variant="h5">
                                                Your card
                                            </Typography>
                                            <Box flexGrow={1} />
                                            <IconButton color="primary">
                                                <ShareIcon />
                                            </IconButton>
                                            <IconButton color="primary" onClick={() => { setOpenEditProfileModal(true) }}>
                                                <EditIcon />
                                            </IconButton>

                                        </Stack>
                                        <Divider />
                                        <BioMainBox>
                                            <Stack sx={{ padding: 2 }}>
                                                <Stack direction={'row'}>
                                                    <Typography variant="h6">
                                                        {userData.firstName.trim()} {userData.lastName.trim()}
                                                    </Typography>

                                                </Stack>
                                                <Typography fontStyle={'italic'} sx={{ fontWeight: 'light' }} variant="subtitle2" >
                                                    {profile.jobTitle}
                                                </Typography>
                                                <Typography variant="subtitle1" color={'secondary'}>
                                                    About me
                                                </Typography>
                                                <Typography sx={{ maxHeight: 140, overflowY: 'auto', paddingRight: 1 }} variant="body1">
                                                    {profile.aboutMe}
                                                </Typography>
                                                <Stack direction={'row'} sx={{ marginTop: 2 }}>
                                                    <Box flexGrow={1} />
                                                    <IconButton color="secondary">
                                                        <FacebookIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary">
                                                        <LinkedInIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary">
                                                        <TwitterIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary">
                                                        <YouTubeIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary">
                                                        <InstagramIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary">
                                                        <RedditIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary">
                                                        <PinterestIcon />
                                                    </IconButton>
                                                    <Box flexGrow={1} />

                                                </Stack>
                                            </Stack>
                                        </BioMainBox>
                                    </Stack>

                                </ContentBoxFullHeight>
                            </Stack>

                        </MainDashboardContainerRight>
                    </Grow>
                    <Divider />
                    <MainDashboardContainerLeft>
                        <Stack sx={{ width: '100%', height: '100%', padding: 1, paddingLeft: 1, overflowY: 'auto' }}>
                            <Grow in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                                <ContentBoxHalfHeight sx={{ marginTop: 2 }}>
                                    <Stack>
                                        <Typography sx={{ color: 'lightgrey' }} fontWeight={'light'} style={{}} variant="h5">
                                            Number of views
                                        </Typography>
                                    </Stack>
                                </ContentBoxHalfHeight>
                            </Grow>
                            <Grow in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                                <Divider />
                            </Grow>
                            <Grow in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                                <ContentBoxHalfHeight sx={{ marginTop: 2 }}>
                                    <Stack>
                                        <Typography sx={{ color: 'lightgrey' }} fontWeight={'light'} variant="h5">
                                            Testimonials
                                        </Typography>
                                    </Stack>
                                </ContentBoxHalfHeight>
                            </Grow>
                        </Stack>
                    </MainDashboardContainerLeft>
                </MainDashboardStack>
            </MainDashboardContainer >
        </>
    )

}

export default DashboardComp