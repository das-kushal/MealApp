import { View,Text,ScrollView } from 'react-native'
import React,{ useEffect,useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient,{ urlFor } from '../sanity'

// import categories from '../data/categories'

const Categories = () => {

    const [categories,setCategories] = useState([])

    useEffect(() => {
        sanityClient.fetch(`*[_type=="category"]`)
            .then((data) => {
                setCategories(data)
            }).catch(console.error)
    },[])

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {/* CategoryCard */}
            {
                categories.map((item) => (
                    <CategoryCard key={item._id} imgUrl={urlFor(item.image).url()} title={item.name} />
                ))
            }
        </ScrollView>
    )
}

export default Categories