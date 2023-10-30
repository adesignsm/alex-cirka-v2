export default {
    name: 'header',
    type: 'document',
    title: 'Header',
    fields: [
        {
            name: 'sliceTitle',
            type: 'string',
            title: 'Slice Title',
            description: 'This is the title for this slice. *Note: This is important if you have a lot of components'
        },
        {
            name: 'logoType',
            type: 'string',
            title: 'Logo Type',
            description: 'Choose the type of logo you want to apply (e.g., text)',
            options: {
                list: [
                    {title: 'Select a type of logo', value: 'defaultVal'},
                    {title: 'Text Logo', value: 'textLogo'},
                    {title: 'Image Logo', value: 'imageLogo'}
                ]
            },
            default: 'defaultVal'
        },
        {
            name: 'textLogoInput',
            type: 'string',
            title: 'Text Logo Input',
            description: 'You chose the "Text Logo" logo. You may input text into the field below',
            hidden: ({document}) => document.logoType !== 'textLogo'
        },
        {
            name: 'imageLogoUpload',
            type: 'image',
            title: 'Image Logo Upload',
            description: 'You chose the "Image Logo" logo. You may upload a logo below',
            options: {
                hotspot: true
            },
            hidden: ({document}) => document.logoType !== 'imageLogo'
        },
        {
            name: 'headerButtons',
            title: 'Header Buttons',
            type: 'array',
            of: [
            {
                type: 'object',
                fields: [
                  {
                    name: 'buttonLabel',
                    title: 'Button Label',
                    type: 'string',
                  },
                  {
                    name: 'buttonLink',
                    title: 'Button Link',
                    type: 'string',
                    description: 'Please input link in this format: /name-of-page. Otherwise, pages won\'t route correctly.',
                  },
                  {
                    name: 'buttonColour',
                    title: 'Button Colour',
                    type: 'string',
                    description: 'Please input colour as a hexcode: #XXXXXX',
                  },
                  {
                    name: 'dropdownOptions',
                    title: 'Dropdown Options',
                    type: 'array',
                    of: [
                      {
                        type: 'object',
                        fields: [
                          {
                            name: 'optionLabel',
                            title: 'Option Label',
                            type: 'string',
                          },
                          {
                            name: 'optionLink',
                            title: 'Option Link',
                            type: 'string',
                            description: 'Please input link in this format: /name-of-project. Otherwise, pages won\'t route correctly.',
                          },
                        ],
                        preview: {
                          select: {
                            label: 'optionLabel',
                          },
                          prepare(selection) {
                            return {
                              title: `Dropdown Option: ${selection.label}`,
                            };
                          },
                        },
                      },
                    ],
                  },
                ],
                preview: {
                  select: {
                    label: 'buttonLabel',
                  },
                  prepare(selection) {
                    return {
                      title: `Button: ${selection.label}`,
                    };
                  },
                },
              },
            ],
        }
    ]
}