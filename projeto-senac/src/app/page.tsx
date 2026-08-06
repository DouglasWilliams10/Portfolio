import Image from "next/image"; 
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Header />
            <Footer />
        </div>
    )
}
