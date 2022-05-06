import { useRouter } from "next/router"
import IndexComp from "../components/index/indexComp";
import MainPageLayout from "../components/MainPageLayout";

export default function Home() {
    const route = useRouter()

    return (
        <MainPageLayout type="landingPage" PageComp={<IndexComp />} />
    )
}