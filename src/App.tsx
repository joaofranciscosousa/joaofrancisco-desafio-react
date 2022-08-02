import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./Context";
import Search from "./components/search/Search";
import Result from "./components/result/Result";

interface User {
    avatar_url: string;
    name: string;
    login: string;
    followers: number | null;
    following: number | null;
    email: string;
    repos_url: string;
    public_repos: number;
}

function App() {
    const [user, setUser] = useState<User>({
        avatar_url: "",
        name: "",
        login: "",
        followers: null,
        following: null,
        email: "",
        repos_url: "",
        public_repos: 0,
    });

    useEffect(() => {
        let pessoa = localStorage.getItem("user");
        setUser(pessoa && JSON.parse(pessoa));
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <div className="App">
            <Context.Provider value={{ user, setUser }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/:username" element={<Result />} />
                    </Routes>
                </Router>
            </Context.Provider>
        </div>
    );
}

export default App;
