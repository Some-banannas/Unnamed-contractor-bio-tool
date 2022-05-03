import { Box, InputBase, Modal, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../src/theme";

export const MainLoginPaper = styled(Paper)((props) => ({
    marginLeft: "50%",
    marginTop: 100,
    transform: "translate(-50%,0%)",
    padding: 25,
    width: 450,
    [theme.breakpoints.down(460)]: {
        transform: "translate(0px,0px)",
        width: "100%",
        height: "100%",
        margin: "unset",
        flexGrow: 1
    },
    // border: `1px solid ${theme.palette.primary.dark}`,
    overflowY: 'auto'
}));