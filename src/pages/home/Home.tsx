import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import NewsLetter from "./NewsLetter";
import ProductCategory from "./ProductCategory";

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts/>
            <ProductCategory/>
            <NewsLetter/>
        </div>
    );
};

export default Home;
