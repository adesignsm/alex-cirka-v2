import { useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';


import './index.css';


const Project = ({data}) => {
    
    const imageBuilder = ImageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return imageBuilder.image(source);
    }

    useEffect(() => {
        console.log('Project data:', data);
    }, [data]);

    return (
        <>
            <div className='project-lightbox'>
                <div className='left-column'>
                    {data && (
                        <div className='project-info'>
                            <h1>{data.projectTitle}</h1>
                        
                             <p>
                                {data.projectDescription && (
                                    <BlockContent 
                                    blocks={data.projectDescription} 
                                    />
                                )}
                            </p>
                        </div>
                    )}
                </div>
                <div className='right-column'>
                    {/* Render the projectThumbnail version two*/}
                     {data.projectThumbnail && data.projectThumbnail.asset && (
                                <img className="responsive-image" src={urlFor(data.projectThumbnail.asset._ref)} alt={data.projectTitle} />
                            )}   
                    </div>
                </div>
           
        </>
    )
}

export default Project;