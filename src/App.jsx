import React, { useEffect, useState } from "react";
import { ContextProvider } from "./utils/context";
import sanityClient from "./sanity";

import "./root.css";

import Header from "./Components/Header";
import About from "./Components/About";
// import Scene from "./Components/Scene";
import Projects from "./Components/Projects";

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
        height: data.bodyHeight || "100%",
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
            <main id="main-page" style={mainStyle}>
                <ContextProvider>
                    <Header />
                    <About />
                    {/* <Scene /> */}
                    <Projects />
                </ContextProvider>
            </main>
        </>
    )
}

export default App;