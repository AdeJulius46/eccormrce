
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'o3t1raif',
  dataset: 'production',
  apiVersion: '2023-02-15',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});




// export default ({ $sanity }, inject) => {
//   const builder = imageUrlBuilder($sanity.config)

//   function urlFor(source) {
//     return builder.image(source)
//   }

//   inject('urlFor', urlFor)
// }


const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);