
import Layout from "@/components/Layout";
import HeroSection from "../components/HeroSection";
import DestinationsSection from "@/components/DestinationsSection";
import { SkeletonTheme } from "react-loading-skeleton";


export default function Home() {

    return (
        <main className="min-h-screen bg-brand-bg">
            <SkeletonTheme highlightColor="#1e3f52" duration={2}>
                <Layout>
                    <HeroSection />
                    <DestinationsSection />
                </Layout>
            </SkeletonTheme>
        </main>
    )
}


