import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Feed from '../components/Feed';
import './home.css';


const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {user && <div className='feed-parent'>
                {/* <div className='feed-types'>

                </div> */}
                <Feed />
            </div>}
        </div>
    );
};

export default Home; 