import React from 'react';
import Announcements from '../components/Announcement';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <Announcements />
            <Navbar />
            <Slider />
            <Categories />
            <Products/>
            <Newsletter/>
            <Footer/>
        </div>
    )
}

export default Home
