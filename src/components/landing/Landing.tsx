import Hero from "./Hero";
import Footer from "./Footer";
import SearchBox from "./SearchBox";

interface Props {

    onSearch(query: string): void;

}

function Landing({

    onSearch,

}: Props) {

    return (

        <main className="min-h-screen flex flex-col justify-center items-center gap-10 px-6">

            <Hero />

            <SearchBox
                onSearch={onSearch}
            />

            <Footer />

        </main>

    );

}

export default Landing;