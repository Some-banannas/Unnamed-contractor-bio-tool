
import DashboardComp from "../components/dasboard/DashboardComp"
import MainPageLayout from "../components/main-page-comp/MainPageLayout"



function Dashboard(params) {
    return (
        <MainPageLayout PageComp={<DashboardComp />} />
    )
}

export default Dashboard