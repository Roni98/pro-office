import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import './App.css';
import { Program } from "./screens";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <Program/>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
