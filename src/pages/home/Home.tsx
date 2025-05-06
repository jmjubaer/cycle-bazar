import Banner from "./Banner";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import NewsLetter from "./NewsLetter";
import OfferProducts from "./OfferProduct";
import ProductCategory from "./ProductCategory";
import Review from "./Review";

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedProducts />
            <ProductCategory />
            <OfferProducts/>
            <Review />
            <NewsLetter />
            <Footer />
        </div>
    );
};

export default Home;
