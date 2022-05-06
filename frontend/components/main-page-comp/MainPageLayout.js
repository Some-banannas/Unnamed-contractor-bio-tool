import { AppBar, Avatar, Box, Button, Divider, IconButton, Menu, MenuItem, MenuList, Stack, Toolbar, Typography } from "@mui/material"
import theme from "../../src/theme"
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT, ME } from "../../client/userQueries";
import { useState } from "react";
import MainPageAvatar from "./MainPageAvatar";
import Image from "next/image";

const appBarTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: theme.palette.primary.main,
        },
        secondary: {
            main: theme.palette.secondary.main,
        },
        background: {
            default: theme.palette.background.default,
            paper: theme.palette.background.paper,
        },
        text: {
            primary: theme.palette.text.primary,
            secondary: theme.palette.text.secondary,
            disabled: theme.palette.text.disabled,
            hint: theme.palette.text.hint,
        },
        error: {
            main: theme.palette.error.main,
        },
        divider: theme.palette.divider,

    },
});
function MainPageLayout({ PageComp, type }) {
    const route = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
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
            }
        }
    })


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
            <ThemeProvider theme={appBarTheme}>
                <AppBar sx={{ padding: 1 }} position="static">
                    <Stack alignItems={'center'} direction={'row'} >
                        {/* <IconButton>
                            <MenuIcon sx={{ color: theme.palette.text.primary }} />
                        </IconButton> */}
                        <Box width={40} height={40} sx={{ marginLeft: 2 }}>
                            <Image src='/images/HeyPaulLogo.png' alt="no image" width={100} height={100} />
                        </Box>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Hey Paul!
                        </Typography>
                        <Box flexGrow={1} />
                        {type === 'landingPage' &&
                            <Button onClick={() => { route.push("/login") }} variant="text" size="small" sx={{ color: "white" }}>
                                Login ➔
                            </Button>
                        }
                        {isLoggedIn &&
                            <Box name="test">
                                <MainPageAvatar />
                            </Box>
                        }

                    </Stack>
                </AppBar>
            </ThemeProvider>
            <Box sx={{
                height: "100%",
                backgroundImage: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.background.paper})`
            }}>
                {PageComp}
            </Box>
        </Stack >
    )
}

export default MainPageLayout