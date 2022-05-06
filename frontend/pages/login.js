import LoginBox from "../components/login/LoginBox"
import MainPageLayout from "../components/main-page-comp/MainPageLayout"

import theme from "../src/theme"

function Login(params) {
    return (
        <MainPageLayout PageComp={<LoginBox />} type={'login/register'} />
    )
}

export default Login