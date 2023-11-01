import React, { useEffect, useState } from "react";
import sanityClient from "./sanity";

import "./root.css";

import Header from "./Components/Header";
import About from "./Components/About";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        sanityClient.fetch('*[_type == "baseStyling"][0]').then((result) => {
            setData(result);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const baseStyle = {
        height: data.bodyHeight || "100vh",
        width: data.bodyWidth || "100vw"
    };
    const backgroundStyle = {};

    if (data.backgroundType === 'colourBackground') {
        backgroundStyle.backgroundColor = data.colourBackgroundInput || '#fff';
    } else if (data.backgroundType === 'imageBackground') {
        backgroundStyle.backgroundImage = data.imageBackgroundUpload;
    }

    const mainStyle = {...backgroundStyle, ...baseStyle};

    return (
        <>
            <main style={mainStyle}>
                <Header />
                <About />
            </main>
        </>
    )
}

export default App;