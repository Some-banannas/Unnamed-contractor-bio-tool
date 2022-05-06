import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#812323',
        },
        secondary: {
            main: "#b5b5b5",
        },
        background: {
            default: '#491111',
            paper: '#101010',
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

export default theme;