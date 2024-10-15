import React from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import TopBarbers from '@/sections/top-barbers';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Hero />
            <About />
            <TopBarbers />
        </div>
    );
};

export default Home;
