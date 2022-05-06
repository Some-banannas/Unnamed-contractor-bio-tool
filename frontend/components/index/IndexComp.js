import { AppBar, Button, Divider, FormControl, Paper, Stack, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { MainIndexPaper } from "."


function IndexComp(params) {
    const route = useRouter()
    const handleCreateAccountClicked = () => {
        route.push('/create-new-account')
    }
    return (
        <MainIndexPaper variant="elevation" elevation={0}>
            <Paper sx={{ padding: 2 }} variant="elevation" elevation={2}>
                <Stack spacing={2} >
                    <Typography textAlign={'center'} variant="h4"  >Don't Have an account?</Typography>
                    <Button color="primary" variant="contained" onClick={handleCreateAccountClicked} >Create Account ➔</Button>
                </Stack>
            </Paper>
        </MainIndexPaper>
    )
}

export default IndexComp