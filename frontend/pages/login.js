import LoginBox from "../components/login/LoginBox"
import MainPageLayout from "../components/MainPageLayout"
import theme from "../src/theme"

function Login(params) {
    return (
        <MainPageLayout PageComp={<LoginBox />} />
    )
}

export default Login