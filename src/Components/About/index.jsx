import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';
import Contact from '../Contact';

import "./index.css";

const About = () => {
    const [data, setData] = useState([]);

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

    return (
        <>
            <div className='about-container'>
                <div className='left-column'>
                    {data.leftColumn &&
                        <>
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
                    {data.rightColumn &&
                        <>
                            <div className='video-reel-container'>
                                {
                                    !data.rightColumn.videoReel ? (
                                        <>
                                            <ReactPlayer url={'https://vimeo.com/796324789'} controls />
                                        </>
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