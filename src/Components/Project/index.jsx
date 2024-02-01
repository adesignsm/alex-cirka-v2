import { useState, useEffect } from 'react';

import './index.css';

const Project = ({data}) => {
    console.log(data.projectTitle);
    return (
        <>
            <div className='project-lightbox'>
                <div className='left-column'>
                    {data && (
                        <div className='project-info'>
                            <h1>{data.projectTitle}</h1>
                            <h3>{data.projectDescription ? data.projectDescription : null}</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Project;