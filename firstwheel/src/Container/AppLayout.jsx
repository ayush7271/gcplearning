import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import HomePageProvider from "./HomePage/HomePageProvider";
import Footer from "../Component/Footer/Footer";
import HeaderProvider from "./Header/HeaderProvider";
import SellerLogin from "../Component/Seller/Login/SellerLogin";

const AppLayout = () => {
    const [globalState, setGlobalState] = useState({})

    return (
        <>
            <Routes>
                <Route path='/'

                    element={
                        <>
                            <HeaderProvider />
                            <HomePageProvider globalState={globalState} setGlobalState={setGlobalState} />
                            <Footer />
                        </>
                    }>
                </Route>
                <Route path='/seller-login'

                    element={
                        <>
                            <HeaderProvider />
                            <SellerLogin globalState={globalState} setGlobalState={setGlobalState} />
                            <Footer />
                        </>
                    }>
                </Route>

            </Routes>
        </>
    )

}
export default AppLayout;