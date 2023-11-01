import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';

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

    console.log(data);

    return (
        <>
        
        </>
    )
}

export default About;