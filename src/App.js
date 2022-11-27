import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import DetailPage from "./DetailPage";
import GlobalStyle from "./GlobalStyle";
import HomePage from "./HomePage";
import SignUpPage from "./SignUpPage";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import { createContext } from "react";

export const userContext = createContext(null);

export default function App() {

    const userState = React.useState(JSON.parse(localStorage.getItem("userData")))

    return (
        <>
            <GlobalStyle/>
            <BrowserRouter>
                <userContext.Provider value={userState}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/sign-up" element={<SignUpPage/>}/>
                        <Route path="/detail" element={<DetailPage/>}/>
                        <Route path="/cart" element={<CartPage/>}/>
                    </Routes>
                </userContext.Provider>
            </BrowserRouter>
        </>
    );
}
