import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import sanityClient from '../../sanity';
import './index.css';

const Contact = ({data}) => {
    const [errors, setErrors] = useState({});
    const [socialLinks, setSocialLinks] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        company: '',
        message: '',
    });

    useEffect(() => {
        if (data && data.rightColumn.socialLinks) {
            setSocialLinks(data.rightColumn.socialLinks);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
        }
    };

    const handleOnFocus = (e) => {
        e.target.previousSibling.classList.replace('not-focused', 'focused');
    }

    const handleOnBlur = (e) => {
        e.target.previousSibling.classList.replace('focused', 'not-focused');
    }

  return (
    <>
        <form onSubmit={handleSubmit} className='contact-form'>
            <div className='name-input'>
                <label htmlFor='name' className='not-focused'>Name <span>*</span></label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    onFocus={(e) => handleOnFocus(e)}
                    onBlur={(e) => handleOnBlur(e)}
                    className='required-input'
                    required
                />
                {errors.name && 
                    <div className="error">
                        {errors.name}
                    </div>
                }
            </div>

        <div className='email-input'>
            <label htmlFor='email' className='not-focused'>Email <span>*</span></label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange}
                onFocus={(e) => handleOnFocus(e)}
                onBlur={(e) => handleOnBlur(e)}
                className='required-input'
                required
            />
            {errors.email && 
                <div className="error">
                    {errors.email}
                </div>
            }
        </div>

        <div className='phone-input'>
            <label htmlFor='phone' className='not-focused'>Phone</label>
            <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleInputChange}
                onFocus={(e) => handleOnFocus(e)}
                onBlur={(e) => handleOnBlur(e)}
            />
        </div>

        <div className='company-input'>
            <label htmlFor='email' className='not-focused'>Company</label>
            <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleInputChange}
                onFocus={(e) => handleOnFocus(e)}
                onBlur={(e) => handleOnBlur(e)}
            />
        </div>

        <div className='message-input'>
            <label htmlFor='email' className='not-focused'>Message <span>*</span></label>
            <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleInputChange}
                className='required-input'
                onFocus={(e) => handleOnFocus(e)}
                onBlur={(e) => handleOnBlur(e)}
            />
            {errors.message && <div className="error">{errors.message}</div>}
        </div>

        <div className='contact-footer'>
            <button type="submit" className='submit-button'> 
                <BsArrowRight/> Send
            </button>
            <ul>
               {socialLinks ? socialLinks.map((link) => {
                    return (
                        <li>
                            {link.socialMediaTitle.toUpperCase()}:
                            <a href={link.link}>
                                <span>
                                   @{link.link.split('/').pop()} 
                                </span>
                            </a>
                        </li>
                    )
               }) : (
                <h2>No Links Found</h2>
               )} 
            </ul>
        </div>
      </form>
    </>
  );
}

export default Contact;