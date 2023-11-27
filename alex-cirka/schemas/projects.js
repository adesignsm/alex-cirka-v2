export default {
    name: 'projects',
    type: 'document',
    title: 'Projects',
    fields: [
        {
            name: 'sliceTitle',
            type: 'string',
            title: 'Slice Title',
            description: 'This is the title for this slice. *Note: This is important if you have a lot of components'
        },
        {
            name: 'projectTitle',
            type: 'string',
            title: 'Project Title',
            description: 'The title for this project',
        },
        {
            name: 'projectDescription',
                type: 'array',
                title: 'Project Description',
                description: 'This is the description for this project.',
                of: [
                    {
                        type: 'block'
                    }
                ]
        },
        {
            name: 'projectThumbnail',
            type: 'image',
            title: 'Project Thumbnail',
            description: 'This will live in the hero section as well as the projects section right below the hero section.',
            options: {
                hotspot: true
            },
        },
        {
            name: 'projectMedia',
            type: 'array',
            title: 'Project Media',
            description: 'Upload media for this project.',
            of: [{type: 'image'}]
        },
    ]
}