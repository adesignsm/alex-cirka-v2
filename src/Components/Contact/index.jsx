import React, { useEffect, useState } from 'react';
import emailjs from "emailjs-com";
import { BsArrowRight } from 'react-icons/bs';
import './index.css';

const SERVICE_ID = "service_0segoxi";
const TEMPLATE_ID = "template_mhea5zf";
const USER_ID = "_4kt98Jj-6hp6cWoO";

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

    const handleSubmit = (e) => {
        e.preventDefault();
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
            e.preventDefault();

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then((result) => {
                if (result.text === "OK") {
                    document.querySelector(".submit-button-text").innerHTML = "Message sent. Thank you";
                } else {
                    document.querySelector(".submit-button-text").innerHTML = "Sorry. Your message was not sent";
                }
            }, (error) => {
                document.querySelector(".submit-button-text").innerHTML = "Sorry. Your message was not sent";
                console.log(error.text);
            });

            e.target.reset();
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
        <form onSubmit={(e) => handleSubmit(e)} className='contact-form'>
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
                <BsArrowRight/> <span className='submit-button-text'>Send</span>
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