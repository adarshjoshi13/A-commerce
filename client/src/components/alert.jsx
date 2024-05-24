import React, { useState, useEffect } from 'react';

export default function Alert({ message, type, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
            if (onClose) {
                onClose();
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <>
            {isVisible && (
                <div className={`alert-container mt-1 mx-1 bg-${type}`}>
                    <div className="alert-content">
                        <h6 className='m-0 text-white'>{message}</h6>

                        <i className="bi bi-x-lg text-white" onClick={() => setIsVisible(false)}></i>
                    </div>
                </div>
            )}
        </>
    );
};
