import React from 'react';
import { Link } from 'react-router-dom';
import './notification.css';

const Notification = (props) => {
    const { texts, normalColor, divColor, hoverColor, onClose, setSpawnNotify } = props;
    if (onClose) {
        return (
            <>
                <div className='notify-div' style={{ '--divColor': divColor }}>
                    <Link to={onClose}>
                        <button className='close-button'>
                            <span>X</span>
                        </button>
                    </Link>
                    <ul>
                        {
                            texts.map((text, i) =>
                                <li key={i}>{text}</li>
                            )
                        }
                    </ul>
                </div>
                <div className='notify-overlay' style={{
                    '--hoverColor': hoverColor,
                    '--normalColor': normalColor
                }}>

                </div>
            </>

        );
    } else {
        return (
            <>
                <div className='notify-div' style={{ '--divColor': divColor }}>
                    <button className='close-button' onClick={() => {
                        setSpawnNotify(false);
                    }}>
                        <span>X</span>
                    </button>
                    <ul>
                        {
                            texts.map((text, i) =>
                                <li key={i}>{text}</li>
                            )
                        }
                    </ul>
                </div>
                <div className='notify-overlay' style={{
                    '--hoverColor': hoverColor,
                    '--normalColor': normalColor
                }}>

                </div>
            </>
        );
    }
};

export default Notification; 