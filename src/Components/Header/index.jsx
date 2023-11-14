import React, { useEffect, useState } from 'react';
import { Context } from '../../utils/context';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';

import "./index.css";

const Header = () => {
    const [data, setData] = useState([]);
    const [logo, setLogo] = useState('');
    const [imageLogo, setImageLogo] = useState('');
    const [buttons, setButtons] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const [activeDropDown, setActiveDropDown] = useState(false);
    const {aboutOpen, setAboutOpen } = Context();

    const imageBuilder = ImageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return imageBuilder.image(source);
    }

    useEffect(() => {
        sanityClient.fetch('*[_type == "header"][0]').then((result) => {
            setData(result);
        }).catch((error) => {
            // eslint-disable-next-line
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (data) {
            if (data.logoType === 'textLogo') {
                setLogo(data.textLogoInput);
            } else if (data.logoType === 'imageLogo') {
                setImageLogo(data.imageLogoUpload.asset._ref);
            }
            if (data.headerButtons) setButtons(data.headerButtons);
        }
    }, [data]);
    
    const handleDropDownClick = (e) => {
        if (e.target.innerText.toLowerCase().indexOf('work') !== -1) {
            setShowDropDown(!showDropDown);
            setActiveDropDown(!activeDropDown);
        } else if (e.target.innerText.toLowerCase().indexOf('about') !== -1) {
            setAboutOpen(!aboutOpen);
        }
    }

    return (
        <>
            <nav className="header-nav">
                <ul>
                    <li className="header-logo header-buttons">
                        <a href="/">
                            {data.logoType === 'imageLogo'
                                ? (
                                    imageLogo && <img src={urlFor(imageLogo).width(100).url()} />
                                ) : (
                                    logo && logo
                                )
                            }
                        </a>
                    </li>
                    {buttons.map((button, key) => {
                        return (
                            <li 
                                key={key}
                                style={{ backgroundColor : `${button.buttonColour || 'transparent'}` }}
                                className="nav-buttons header-buttons"
                            >
                                {
                                    button.buttonLink && !button.dropdownOptions ? (
                                        <a href={button.buttonLink}>
                                            {button.buttonLabel}
                                        </a>
                                    ) : (
                                        <div className='has-dropdown' onClick={(e) => handleDropDownClick(e)}>
                                            {button.buttonLabel}
                                            {button.buttonLabel.toLowerCase() === 'work' 
                                                ? (
                                                    !activeDropDown ? (
                                                        <FiChevronDown className='chevron' />
                                                    ) : (
                                                        <FiChevronUp className='chevron-active' />
                                                    )
                                                ) : (
                                                    null
                                                )
                                            }
                                            {button.dropdownOptions && (
                                                <ul className={`dropdown-menu ${showDropDown ? 'active' : ''}`}>
                                                    {button.dropdownOptions.map((option, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <a href={option.optionLink}>
                                                                    {option.optionLabel}
                                                                    <span>0{index + 1}</span>
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    )
                                }
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Header;