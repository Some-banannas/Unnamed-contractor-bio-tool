import { MissingFieldError, useQuery } from "@apollo/client"
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


function DashboardComp(params) {
    const [animTimeout, setAnimTimeout] = useState(500)
    const [animState, setAnimState] = useState({
        in: true,
    })
    const [userData, setUserData] = useState({})
    // const [count, setCount] = useState(0)

    const mainRef = useRef(null)

    const { data: meData, loading: meLoading, error: meError } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            // console.log(data.me)
            setUserData(data.me)
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


    if (meLoading) {
        return (
            <></>
        )
    }

    // console.log(userData)

    return (
        < >
            <MainDashboardContainer ref={mainRef}>
                <MainDashboardStack direction={'row'} sx={{ width: '100%', height: '100%' }}>


                    <Grow in={animState.in} timeout={animTimeout} mountOnEnter unmountOnExit>
                        <MainDashboardContainerRight>
                            <Stack sx={{ width: '100%', height: '100%', padding: 1, overflowY: 'auto' }}>
                                <ContentBoxFullHeight sx={{ marginTop: 2 }}>
                                    <Stack spacing={1}>
                                        <Stack direction={'row'}>
                                            <Typography variant="h5">
                                                Your Bio
                                            </Typography>
                                            <Box flexGrow={1} />
                                            <IconButton color="primary">
                                                <ShareIcon />
                                            </IconButton>
                                            <IconButton color="primary">
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
                                                <Typography fontStyle={'italic'} fontWeight={'light'} variant="subtitle2" >
                                                    Front-end Developer
                                                </Typography>
                                                <Typography variant="subtitle1" color={'secondary'}>
                                                    About me
                                                </Typography>
                                                <Typography sx={{ maxHeight: 140, overflowY: 'auto', paddingRight: 1 }} variant="body1">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Viverra tellus in hac habitasse platea dictumst.
                                                    At urna condimentum mattis pellentesque id nibh tortor id.
                                                    Proin sed libero enim sed faucibus.
                                                    Habitant morbi tristique senectus et netus et malesuada fames ac.
                                                    Vestibulum sed arcu non odio euismod lacinia at quis risus. Aenean et tortor at risus viverra adipiscing at.
                                                    Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere.
                                                    Adipiscing diam donec adipiscing tristique risus nec.
                                                    Mattis molestie a iaculis at erat pellentesque adipiscing commodo.
                                                    Mattis molestie a iaculis at erat pellentesque adipiscing commodo.
                                                    Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan.
                                                    Eu volutpat odio facilisis mauris sit amet massa vitae.
                                                    Diam quam nulla porttitor massa id.
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
                                        <Typography style={{}} variant="h5">
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
                                        <Typography variant="h5">
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