import React from 'react';
// import { CardDemo } from '@/components/blocks/cards-demo-3';
import Hero from '@/sections/Hero';
import About from '@/sections/About';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Hero />
            <About />
        </div>
    );
};

export default Home;
