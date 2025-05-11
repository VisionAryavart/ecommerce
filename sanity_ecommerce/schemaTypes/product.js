export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type:'image'}],
            options: {
                hotspot: true,
                // the hotspot: true property is used within an image field definition in a schema. It enables hotspot and cropping features for images in the Sanity Studio interface.
            }
        },
        {
              name: 'name',
              title: 'Name',
              type: 'string',

        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: '100'
            }
        },
        {
            name:'price',
            title: 'Price',
            type: 'number',

        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        }
        ,
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                {title: 'Gym Equipment', value: 'gym-equipment'},
                {title: 'Protein Supplements', value: 'protein'},
                {title: 'Nutrient Groceries', value: 'groceries'},
                {title: 'Fitness Accessories', value: 'accessories'}
              ],
              layout: 'dropdown' // Makes it easier to select in Sanity Studio
            }
          }
    ]
    
}