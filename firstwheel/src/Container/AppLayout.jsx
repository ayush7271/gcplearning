import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePageProvider from "./HomePage/HomePageProvider";

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
        </>
    )

}
export default AppLayout;