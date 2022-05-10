import { Box, InputBase, Modal, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../src/theme";

const medBrkpt = 1330
const smlBrkpt = 800
export const MainDashboardContainer = styled(Box)((props) => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    // marginLeft: 100,
    // marginRight: 100
    // backgroundColor: 'blue',
    padding: 25,
    [theme.breakpoints.down(smlBrkpt)]: {
        padding: 0
    }

}));
export const MainDashboardStack = styled(Stack)((props) => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    // marginLeft: 100,
    // marginRight: 100
    // backgroundColor: 'blue',
    [theme.breakpoints.down(medBrkpt)]: {
        flexDirection: 'column'
    }

}));
export const MainDashboardContainerLeft = styled(Box)((props) => ({
    position: 'absolute',
    inset: 0,
    bottom: 25,
    right: '50%',
    // marginLeft: 25,
    // backgroundColor: 'blue',

    [theme.breakpoints.down(medBrkpt)]: {
        position: 'relative',
        inset: 'unset',
        bottom: 'unset',
        right: 'unset'
    }
}));
export const MainDashboardContainerRight = styled(Box)((props) => ({
    position: 'absolute',
    inset: 0,
    left: '50%',
    bottom: 25,
    // marginLeft: 25,
    // backgroundColor: 'yellow'
    borderLeft: `1px solid rgba(255, 255, 255, 0.12)`,
    [theme.breakpoints.down(medBrkpt)]: {
        position: 'relative',
        inset: 'unset',
        bottom: 'unset',
        right: 'unset',
        borderLeft: `none`
    }

}));


export const ContentBoxHalfHeight = styled(Box)((props) => ({
    width: '100%',
    minHeight: 400,
    // backgroundColor: 'red',
    // backgroundColor: '#ffffff0e',
    // backdropFilter: 'blur(20px)',
    borderRadius: 10,
    padding: 20,
    [theme.breakpoints.down(smlBrkpt)]: {
        padding: 10
    }

}));
export const ContentBoxFullHeight = styled(Box)((props) => ({
    width: '100%',
    minHeight: 800,
    // backgroundColor: 'red'
    // backgroundColor: '#ffffff0e',
    // backdropFilter: 'blur(20px)',
    borderRadius: 10,
    padding: 20,
    [theme.breakpoints.down(medBrkpt)]: {
        minHeight: 'unset'
    },
    [theme.breakpoints.down(smlBrkpt)]: {
        padding: 10
    }

}));
export const BioMainBox = styled(Box)((props) => ({
    width: '100%',
    minHeight: 500,
    // backgroundColor: '#ffffff05',
    // backdropFilter: 'blur(20px)',
    borderRadius: 12

}));

