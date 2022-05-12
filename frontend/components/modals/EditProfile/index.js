import { Box, InputBase, Modal, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../../src/theme";

const medBrkpt = 630
const smlBrkpt = 800
export const MainModalBox = styled(Box)((props) => ({
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    // height: 200,
    backgroundColor: "rgba(0,0,0,0.9)",
    backdropFilter: 'blur(6px)',
    borderRadius: 10,
    padding: 15,
    [theme.breakpoints.down(medBrkpt)]: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        width: 'unset',
        transform: 'translate(0%, 0%)',
        borderRadius: 0
    },
}));