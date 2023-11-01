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
            ]
        }
    ]
}