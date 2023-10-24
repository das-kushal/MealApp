import { createClient } from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

const client = createClient({
    projectId: 'unakl7io',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-02-03'
})

const builder = ImageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

export default client