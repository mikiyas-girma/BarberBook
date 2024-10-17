import React from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import TopBarbers from '@/sections/top-barbers';
import Testimonials from '@/sections/testimonials';
import LatestStyles from '@/sections/latest-styles';
import Footer from '@/sections/Footer';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Hero />
            <About />
            <TopBarbers />
            <Testimonials />
            <LatestStyles />
            <Footer />
        </div>
    );
};

export default Home;
