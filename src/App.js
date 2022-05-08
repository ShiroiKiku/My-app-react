import React, { useState, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Posts from "./pages/Posts"
import "./styles/App.css"
import Navber from "./components/UI/Navbar/Navber"
import Error from "./pages/Error"
import AppRouter from "./components/AppRouter"
import { AuthContext } from "./components/context"

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuth(true)
            localStorage.setItem("auth", "true")
        }
        setLoading(false)
    }, [])
    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                isLoading,
            }}>
            <BrowserRouter>
                <Navber />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
