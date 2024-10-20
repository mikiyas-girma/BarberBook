import React from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import TopBarbers from '@/sections/top-barbers';
import Testimonials from '@/sections/testimonials';
import LatestStyles from '@/sections/latest-styles';
import Footer from '@/sections/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/utils/store';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
    return (
        <div className="home bg-background">
            <Hero name={loggedUser?.name} />
            <About />
            <TopBarbers />
            <Testimonials />
            <LatestStyles />
            <Footer />
        </div>
    );
};

export default Home;
