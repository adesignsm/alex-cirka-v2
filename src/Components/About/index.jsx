import React, { useEffect, useState, Suspense } from 'react';
import { IoClose } from 'react-icons/io5';
import { Context } from '../../utils/context';
import ReactPlayer from 'react-player';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';
import Contact from '../Contact';

import "./index.css";

const About = () => {
    const [data, setData] = useState([]);
    const { aboutOpen, setAboutOpen, setSearchVisible } = Context();

    const imageBuilder = ImageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return imageBuilder.image(source);
    }

    useEffect(() => {
        sanityClient.fetch('*[_type == "about"][0]').then((result) => {
            setData(result);
        }).catch((error) => {
            // eslint-disable-next-line
            console.error(error);
        });
    }, []);

    

    const handleCloseAbout = () => {
        setAboutOpen(false);
        setSearchVisible(true);
    }

    return (
        <>
            <div className={`about-container ${aboutOpen ? 'show' : 'hidden'}`}>
                <div className='left-column'>
                    {data.leftColumn &&
                        <>
                            {/* ABOUT */}
                            <article className='intro-text-container'>
                                <h3>{data.leftColumn.introText[0].children[0].text}</h3>
                            </article>
                            <article className='select-clients-container'>
                                <h2> Select Clients </h2>
                                <ul>
                                    {data.leftColumn.selectClient.map((item, index) => {
                                        return (
                                            <li key={index}>{item.clientName}</li>
                                        )
                                    })}
                                </ul>
                            </article>
                        </>
                    }
                </div>


                
                <div className='right-column'>
                    <IoClose className='close-button' size={40} onClick={handleCloseAbout}/>
                    {data.rightColumn &&
                        <>
                            <div className='video-reel-container'>
                                {
                                    !data.rightColumn.videoReel ? (
                                        <Suspense fallback={<div>Loading video...</div>}> {/* Provide a fallback */}
                                            <ReactPlayer url={'https://vimeo.com/796324789'} controls />
                                        </Suspense>
                                    ) : (
                                        <>
                                            <h3>Video goes here</h3>
                                        </>
                                    )
                                }
                            </div>
                            <div className='contact-container'>
                                {data.rightColumn.contactEmail ? (
                                    <Contact data={data}/>
                                ) : (
                                    <button>
                                        <a href='mailto:alexcirka@gmail.com'> CONTACT </a>
                                    </button>
                                )}
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default About;