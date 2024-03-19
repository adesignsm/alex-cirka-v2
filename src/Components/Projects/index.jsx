import { useEffect, useState, Suspense } from 'react';
import { Context } from '../../utils/context';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';

import './index.css';

import Project from '../Project';

const Projects = () => {
    const [data, setData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const { lightBoxOpen, setLightBoxOpen } = Context(); 

    const imageBuilder = ImageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return imageBuilder.image(source);
    }
  
    useEffect(() => {
      sanityClient.fetch('*[_type == "projects"]').then((result) => {
        setData(result);
      }).catch((error) => {
        // eslint-disable-next-line
        console.error(error);
      });
    }, []);

    const handleMouseEnter = (e) => {
        e.target.nextSibling.classList.add('show-title');
    }

    const handleMouseLeave = (e) => {
        e.target.nextSibling.classList.remove('show-title');
    }

    const handleOnClick = (project) => {
        setProjectData(project);
        console.log('test');

        if (project) {
            setLightBoxOpen(true);
        }
    }

    console.log(lightBoxOpen)

    return (
        <>
            <div id='projects-section'>
                <div className='project-preview-container'>
                    {data && (
                        data.map((project, index) => {
                            return (
                                <div className='project-thumbnail' key={index} onClick={() => handleOnClick(project)}>
                                    <img 
                                        src={urlFor(project.projectThumbnail.asset._ref).url()} 
                                        onMouseEnter={(e) => handleMouseEnter(e)}
                                        onMouseLeave={(e) => handleMouseLeave(e)}
                                    />
                                    <h2 className='title'>{project.projectTitle}</h2>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
            <Suspense fallback={<h1>Loading profile...</h1>}>
                <Project data={projectData} />
            </Suspense>
        </>
    )
}

export default Projects;