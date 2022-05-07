import { AppBar, Box, Button, Divider, FormControl, Paper, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { MainIndexPaper } from "."


function IndexComp(params) {
    const route = useRouter()
    const handleCreateAccountClicked = () => {
        route.push('/create-new-account')
    }
    const handleLoginClicked = () => {
        route.push('/login')
    }
    return (
        <MainIndexPaper variant="elevation" elevation={0}>
            <Stack>
                <Box sx={{ padding: 2 }} variant="elevation" elevation={2}>
                    <Stack spacing={2} >
                        <Typography textAlign={'center'} variant="h4"  >Don't have an account?</Typography>
                        <Button color="primary" variant="contained" onClick={handleCreateAccountClicked} >Create Account ➔</Button>
                    </Stack>
                </Box>
                <Box sx={{ padding: 2 }} variant="elevation" elevation={2}>
                    <Stack spacing={2} >
                        <Typography textAlign={'center'} variant="h4"  >Already have an account?</Typography>
                        <Button color="primary" variant="contained" onClick={handleLoginClicked} >Login ➔</Button>
                    </Stack>
                </Box>
            </Stack>
        </MainIndexPaper>
    )
}

export default IndexComp