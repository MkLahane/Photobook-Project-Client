import React from 'react';
import './loading.css';

const Loading = () => {
    return (
        <div className='loading-div'>
            <div className='loading-background-temp'>

            </div>
            <div className='loading-background'>

            </div>
            <span style={{ '--l_offset': 1 }}>.</span>
            <span style={{ '--l_offset': 2 }}>.</span>
            <span style={{ '--l_offset': 3 }}>.</span>
            <span style={{ '--l_offset': 4 }}>.</span>
            <span style={{ '--l_offset': 5 }}>.</span>
        </div>
    );
};

export default Loading;