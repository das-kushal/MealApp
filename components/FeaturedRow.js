import { View,Text,ScrollView } from 'react-native'
import React,{ useEffect,useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';
// import restaurantData from '../data/restaurants';

const FeaturedRow = ({ id,title,description }) => {

    const [restaurantData,setRestaurantData] = useState([])

    useEffect(() => {
        sanityClient.fetch(`*[_type=="featured" && _id==$id] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->,
                type-> {
                    name
                }
            }
        }[0]`,{ id }).then((data) => {
            setRestaurantData(data?.restaurants)
        }).catch(console.error)
    },[id])

    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{title}</Text>
                <AntDesign name="arrowright" size={24} color="#00ccbb" />
            </View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>


            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: 15,
                }}
                className="pt-4"
            >

                {/* Restaurant Cards  */}

                {restaurantData?.map(item => {
                    return (
                        <RestaurantCard
                            key={item._id}
                            id={item._id}
                            imgUrl={item.image}
                            title={item.name}
                            rating={item.rating}
                            genre={item.type?.name}
                            address={item.address}
                            short_description={item.short_description}
                            dishes={item.dishes}
                            long={item.long}
                            lat={item.lat}
                        />
                    )
                })}


            </ScrollView>
        </View>
    )
}

export default FeaturedRow