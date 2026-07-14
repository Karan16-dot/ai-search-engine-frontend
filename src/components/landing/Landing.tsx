import Hero from "./Hero";
import SearchBox from "./SearchBox";
import Footer from "./Footer";

type LandingProps = {
    onSearch: (query: string) => void;
};

function Landing({ onSearch }: LandingProps) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-10 px-6">

            <Hero />

            <SearchBox onSearch={onSearch} />

            <Footer />

        </div>
    );
}

export default Landing;