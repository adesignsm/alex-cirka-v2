export default {
    name: 'about',
    type: 'document',
    title: 'About',
    fields: [
        {
            name: 'sliceTitle',
            type: 'string',
            title: 'Slice Title',
            description: 'This is the title for this slice. *Note: This is important if you have a lot of components'
        },
        {
            name: 'leftColumn',
            type: 'object',
            title: 'Left Column Content',
            fields: [
                {
                    name: 'introText',
                    type: 'array',
                    title: 'About Intro Copy',
                    description: 'This is the copy content for the intro block in the About container',
                    of: [
                        {
                            type: 'block'
                        }
                    ]
                },
                {
                    name: 'selectClient',
                    type: 'array',
                    title: 'Select Clients',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'clientName',
                                    title: 'Client Name',
                                    description: 'Please input the name of your select client below',
                                    type: 'string'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'rightColumn',
            type: 'object',
            title: 'Right Column Content',
            fields: [
                {
                    title: 'Video Reel Upload',
                    name: 'videoReel',
                    type: 'file',
                },
                {
                    name: 'socialLinks',
                    type: 'array',
                    title: 'Social Links',
                    description: 'Add any of your social media links below',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'socialMediaTitle',
                                    type: 'string',
                                    description: 'Enter the name of the social media platform. e.g., Instagram'
                                },
                                {
                                    name: 'link',
                                    title: 'Social Media Link',
                                    type: 'url',
                                    validation: Rule => Rule.uri({
                                        scheme: ['http', 'https', 'mailto', 'tel']
                                    })
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'contactEmail',
                    type: 'string',
                    title: 'Contact Email',
                    description: 'This is the email that your visitors can use to contact you. Please note that your email format should start with "mailto:"',
                    validation: Rule =>
                    Rule.custom((email) => {
                        if (!/^mailto:/i.test(email)) {
                            return 'Invalid email format. It should start with "mailto:"';
                        }
                        
                        const emailAddress = email.replace(/^mailto:/i, '');
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

                        if (!emailRegex.test(emailAddress)) {
                            return 'Invalid email address';
                        }

                        return true;
                    }).error('Please enter a valid email address')
                }
            ]
        }
    ]
}