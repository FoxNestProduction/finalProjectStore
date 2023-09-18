import React from 'react';
import { Route, Routes } from 'react-router';
import BlogPage from './pages/Blog/Blog';
import ContactPage from './pages/Contact/Contact';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import PricingPage from './pages/Pricing/Pricing';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path='/' element={ <HomePage/> }/>
            <Route path='/Menu' element={ <MenuPage/>}/>
            <Route path='/Blog' element={ <BlogPage/> }/>
            <Route path='/Pricing' element={ <PricingPage/>}/>
            <Route path='/Contact' element={ <ContactPage/>}/>
        </Routes>
    )
}

export default AppRoutes;