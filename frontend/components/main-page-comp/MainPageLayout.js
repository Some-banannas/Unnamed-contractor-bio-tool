import { AppBar, Avatar, Box, Button, ButtonGroup, Divider, Drawer, Grow, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Stack, Tabs, Toolbar, Typography } from "@mui/material"
import theme from "../../src/theme"
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT, ME } from "../../client/userQueries";
import { useState } from "react";
import MainPageAvatar from "./MainPageAvatar";
import Image from "next/image";
import DashboardIcon from '@mui/icons-material/Dashboard';

const sideBarTheme = createTheme({
    palette: {
        mode: 'dark',
        // primary: {
        //     main: '#9a7807',
        // },
        // secondary: {
        //     main: '#78fbd4',
        // },
        // success: {
        //     main: '#5bbb09',
        // },
        // info: {
        //     main: '#f8f8f9',
        // },
        background: {
            default: 'transparent',
            paper: 'transparent',
        },
    },

});

function MainPageLayout({ PageComp, type }) {
    const route = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    // -----------------------------------------------------------------------------------------------------------------------------------
    const { } = useQuery(ME, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data.me === null) {
                setIsLoggedIn(false)
                if (type !== 'login/register') {
                    route.push("/login")
                }
            } else {
                setIsLoggedIn(true)
                // console.log(data.me)
                setUserInfo(data.me)
            }
        }
    })


    const handleMenuClicked = () => {
        setMenuOpen(true)
    }
    const handleMenuClose = () => {
        setMenuOpen(false)
    }


    // -----------------------------------------------------------------------------------------------------------------------------------


    return (
        <Stack
            sx={{
                width: '100%',
                height: '100vh',
                overflowY: 'auto',
                // display: 'flex'
            }}
        >
            <Box sx={{ padding: 1, height: 80 }} position="static">
                <Stack alignItems={'center'} direction={'row'} >
                    {isLoggedIn &&
                        <>
                            <IconButton disabled={!isLoggedIn} onClick={handleMenuClicked} >
                                <MenuIcon sx={{ color: theme.palette.text.primary }} />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={menuOpen}
                                onClose={handleMenuClose}
                                elevation={0}
                            >
                                <Box sx={{ width: 250, bgcolor: 'transparent' }} >
                                    <List sx={{ width: 250, bgcolor: 'transparent' }} >
                                        <ListItem button onClick={() => { route.push('/dashboard') }} >
                                            <ListItemIcon>
                                                <DashboardIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={'Dashboard'} />
                                        </ListItem>
                                    </List>
                                </Box>

                            </Drawer>
                        </>
                    }

                    <Box flexGrow={1} />

                    {isLoggedIn &&
                        <Box name="test">
                            <Stack direction={'row'} spacing={1}>
                                <MainPageAvatar />
                                <Stack >
                                    {/* <Typography variant="subtitle2" sx={{ paddingTop: 1, marginRight: 2 }}>{userInfo.firstName}</Typography> */}
                                    {/* <Typography>{userInfo.lastName}</Typography> */}
                                </Stack>
                            </Stack>
                        </Box>
                    }

                </Stack>
            </Box >

            <Box sx={{
                height: "100%",
                width: '100%',

            }}>
                <Box sx={{ background: `url("/images/background.jpg")`, position: 'fixed', inset: 0, zIndex: -1, backgroundSize: "cover" }} >

                </Box>
                {PageComp}
            </Box>
            {/* <Box sx={{ transform: 'rotate(-45deg)', width: '100vw', height: 80, position: 'fixed', bottom: 0, zIndex: -1, bgcolor: theme.palette.primary.main, borderRadius: 100 }} /> */}
        </Stack >
    )
}

export default MainPageLayout