import createClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({

    projectId: 'vaegv2rh',
    dataset: 'production',
    apiVersion: '2024-04-30',
    useCdn: 'true',
    token: process.env.token_key
}
);

const builder = imageUrlBuilder(client);
export const urlFor = (source)=>builder.image(source);