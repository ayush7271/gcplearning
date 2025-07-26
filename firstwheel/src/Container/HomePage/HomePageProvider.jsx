import React from 'react';
import HomePage from '../../Component/HomePage/HomePage';
import Header from '../Header/HeaderProvider';
import HeaderProvider from '../Header/HeaderProvider';

const HomePageProvider = () => {
    return (
        <>
            {/* <HeaderProvider/> */}
            <HomePage />
        </>
    );
};

export default HomePageProvider;
