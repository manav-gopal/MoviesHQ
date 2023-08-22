import React from 'react';
import '.././style/Error.scss';

const Errors = () => {
    return (
        <div className='error_container'>
            <div className='container_wrapper'>
                <div className='container'>
                    <div className='bg'><span>404</span></div>
                    <span className='bot_image'></span>
                    <h1>Sorry ! Page not found.</h1>
                </div>
            </div>
        </div>
    );
}

export default Errors;