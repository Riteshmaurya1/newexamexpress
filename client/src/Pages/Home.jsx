import React, { useContext, useEffect } from 'react';
import './Home.css';
import HomeNavbar from '../Components/Home/HomeNavbar';
import AISide from '../Components/Home/AiSide';
import PaperSide from '../Components/Home/PaperSide';
import { AppContext } from '../Context/AppContext';
import { Helmet } from 'react-helmet';

const Home = () => {
    const { semester, branch, subjectData } = useContext(AppContext);

    return (
        <>
            <div className='main-div-home' >
                <Helmet>
                    <title>Exam Express | Subject Page</title>
                    <meta
                        name='description'
                        content='Exam Express is a platform for students to practice and improve their knowledge in various subjects.'
                    />
                    <meta
                        name='keywords'
                        content='Exam Express, practice, improve, knowledge, subjects'
                    />
                </Helmet>
                <div className="navbar-side">
                    <HomeNavbar />
                </div>
                <div className="paper-side">
                    <div className='inner-paper-side'>
                        {/* Conditional rendering of PaperSide based on selections */}
                        {branch && semester && (
                            <PaperSide branch={branch} semester={semester} subjectData={subjectData} />
                        )}
                    </div>
                </div>
                <div className="ai-side">
                    <AISide />
                </div>
            </div >
        </>
    );
};

export default Home;