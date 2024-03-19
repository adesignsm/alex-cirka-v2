import { useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import sanityClient from '../../sanity';
import ImageUrlBuilder from '@sanity/image-url';
import { IoClose } from 'react-icons/io5';
import { Context } from '../../utils/context';


import './index.css';


const Project = ({data}) => {

    // const { ligthBoxOpen, SetlightBoxOpen } = Context();
    const { lightBoxOpen, setLightBoxOpen } = Context();    
    
    const imageBuilder = ImageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return imageBuilder.image(source);
    }

    useEffect(() => {
        console.log('Project data:', data);
    }, [data]);

    // const handleCloseLightBox = () => {
    //     SetlightBoxOpen(false);
    // }

    const handleCloseLightBox = () => {
        setLightBoxOpen(false);
        console.log(handleCloseLightBox);
    };

    console.log('Lightbox open:', lightBoxOpen);
    
    return (
        <>
            <div className={`project-lightbox ${lightBoxOpen ? 'show' : 'hidden'}`}>
            
             {/* <div className='project-lightbox'> */}
                    <div>
                    <IoClose className='close-button' size={40} onClick={handleCloseLightBox}/>
                    </div>

                    <div className='columns-container'>
                <div className='left-column'>
                {/* <div> */}
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
                </div>
           
        </>
    )
}

export default Project;