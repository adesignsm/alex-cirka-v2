import React, { useEffect, useState } from "react";
import sanityClient from "../../sanity";

import "./index.css";

const Header = () => {
    const [data, setData] = useState([]);
    const [logo, setLogo] = useState('');
    const [buttons, setButtons] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        sanityClient.fetch('*[_type == "header"][0]').then((result) => {
            setData(result);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (data) {
            if (data.logoType === 'textLogo') setLogo(data.textLogoInput || data.imageLogoUpload);
            if (data.headerButtons) setButtons(data.headerButtons);
        }
    }, [data]);

    const handleDropDownClick = (e) => {
        if (e.target.innerText.toLowerCase().indexOf('work') !== -1) {
            setShowDropDown(!showDropDown);
        }
    }

    return (
        <>
            <nav className="header-nav">
                <ul>
                    <li className="header-logo header-buttons">
                        <a href="/">
                            {logo}
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
                                        <div onClick={(e) => handleDropDownClick(e)}>
                                            {button.buttonLabel}
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