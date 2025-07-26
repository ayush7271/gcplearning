import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePageProvider from "./HomePage/HomePageProvider";
import Footer from "../Component/Footer/Footer";

const AppLayout = () => {

    return (
        <>
            <Routes>
                <Route path='/'

                    element={
                                <HomePageProvider/>
                    }>
                </Route>

            </Routes>
            <Footer/>
        </>
    )

}
export default AppLayout;