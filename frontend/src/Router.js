import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import AuthorPage from "./pages/AuthorPage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/journal/">
                    <Route path=":journalName" element={<JournalPage/>}/>
                </Route>
                <Route path="/author/">
                    <Route path=":authorId" element={<AuthorPage/>}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
