import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import NewsLetter from "./NewsLetter";
import ProductCategory from "./ProductCategory";

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts/>
            <ProductCategory/>
            <NewsLetter/>
            <Footer/>
        </div>
    );
};

export default Home;
