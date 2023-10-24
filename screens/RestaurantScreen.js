import { View,Text,ScrollView,Image,TouchableOpacity } from 'react-native'
import React,{ useEffect,useLayoutEffect } from 'react'
import { useNavigation,useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { Ionicons,Entypo } from '@expo/vector-icons';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }
    } = useRoute()

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }))
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[])

    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className="relative">
                    <Image source={{ uri: urlFor(imgUrl).url() }} className="w-full h-56 bg-gray-300 p-4" />
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="absolute top-14 left-5 bg-gray-100 p-2 rounded-full"
                    >
                        <Entypo name="chevron-left" size={20} color="#00ccbb" />
                    </TouchableOpacity>
                </View>

                <View className="bg-white">
                    <View className=" px-4 pt-4">
                        <Text className="font-bold text-3xl">{title}</Text>
                        <View className="flex-row space-x-2 my-1 items-center">
                            <View className="flex-row items-center space-x-1">
                                <Entypo name="star" size={22} color="green" opacity={0.4} />

                                <Text className="pt-2 text-sm text-gray-500"><Text className="pt-2 text-sm text-green-500">{rating} . </Text>{genre}</Text>

                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Ionicons name="location" size={22} color="grey" opacity={0.4} />
                                <Text className="text-sm text-gray-500"> Nearby . {address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                    </View>
                </View>

                <View className="pb-36">
                    <Text className="px-4 pt-6 text-xl mb-3 font-bold">Menu</Text>
                    {/* Dishes */}
                    {dishes.map(dish => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.short_description}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen