export default {
    title: 'Video Reel Upload',
    name: 'videoReel',
    type: 'document',
    fields: [
        { title: 'Title', name: 'title', type: 'string' },
        {
            title: 'Video Reel file',
            name: 'video',
            type: 'file',
        },
    ],
}