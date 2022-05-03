import { AppBar, Box, Button, IconButton, Menu, MenuList, Stack, Toolbar, Typography } from "@mui/material"
import theme from "../src/theme"
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const appBarTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#812323',
        },
        secondary: {
            main: '#491111',
        },
        background: {
            default: '#1a1a1a',
            paper: '#242424',
        },
        text: {
            primary: 'rgba(255,255,255,0.87)',
            secondary: 'rgba(214,214,214,1)',
            disabled: 'rgba(239,237,237,0.87)',
            hint: '#ffffff',
        },
        error: {
            main: '#e2080b',
        },
        divider: 'rgba(245,86,86,0.12)',
        type: 'dark',
    },
});
function MainPageLayout({ PageComp }) {
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
                <AppBar position="static">
                    <Stack alignItems={'center'} direction={'row'} >
                        <IconButton>
                            <MenuIcon sx={{ color: theme.palette.text.primary }} />
                        </IconButton>
                        {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Hello there
                        </Typography> */}
                    </Stack>
                </AppBar>
            </ThemeProvider>
            <Box sx={{ height: "100%" }}>
                {PageComp}
            </Box>
        </Stack>
    )
}

export default MainPageLayout