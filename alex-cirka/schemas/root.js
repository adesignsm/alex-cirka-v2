export default {
    name: 'baseStyling',
    type: 'document',
    title: 'Base Styling',
    fields: [
        {
            name: 'sliceTitle',
            type: 'string',
            title: 'Slice Title',
            description: 'This is the title for this slice. *Note: This is important if you have a lot of components'
        },
        {
            name: 'backgroundType',
            type: 'string',
            title: 'Background Type',
            description: 'Choose the type of background you want to apply (e.g., image, colour)',
            options: {
                list: [
                    {title: 'Select a type of background', value: 'defaultVal'},
                    {title: 'Image Background', value: 'imageBackground'},
                    {title: 'Colour Background', value: 'colourBackground'}
                ]
            },
            default: 'defaultVal'
        },
        {
            name: 'colourBackgroundInput',
            type: 'string',
            title: 'Colour Background Input',
            description: 'You chose the "Colour Background" background. You may input a colour in this format below : #XXXXXX',
            hidden: ({document}) => document.backgroundType !== 'colourBackground'
        },
        {
            name: 'imageBackgroundUpload',
            type: 'image',
            title: 'Image Background Upload',
            description: 'You chose the "Image Background" background. You may upload an image below',
            options: {
                hotspot: true
            },
            hidden: ({document}) => document.backgroundType !== 'imageBackground'
        },
    ]
}