import { useRouter } from "next/router"
import IndexComp from "../components/index/indexComp";
import MainPageLayout from "../components/main-page-comp/MainPageLayout";

export default function Home() {
    const route = useRouter()

    return (
        <MainPageLayout type="login/register" PageComp={<IndexComp />} />
    )
}