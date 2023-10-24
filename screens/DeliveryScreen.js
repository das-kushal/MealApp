import { View,Text,SafeAreaView,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { Entypo } from '@expo/vector-icons';

import MapView,{ Marker } from 'react-native-maps'

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(rootState => selectRestaurant(rootState))
    return (
        <View className="bg-[#00ccbb] flex-1">
            <SafeAreaView className="z-50 pt-5">
                <View className="flex-row justify-between items-center p-5">
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Entypo name="cross" size={30} color="white" />
                    </TouchableOpacity>
                    <Text className="font-normal text-white text-lg">Order Help</Text>
                </View>

                <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
                    <View className="flex-row justify-between">

                        <View>
                            <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                            <Text className="text-4xl font-bold">30-35 Minutes</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://links.papareact.com/fls' }}
                            className="h-20 w-20"
                        />
                    </View>
                    <Text className="mt-3 text-gray-300">
                        Your order at {restaurant.title} has been placed and is being prepared.
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                className="flex-1 -mt-10 z-0"
                mapType='mutedStandard'
            >
                <Marker
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    identifier='origin'
                    pinColor='#00ccbb'
                />
            </MapView>

            <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
                <Image
                    source={{ uri: 'https://links.papareact.com/wru' }}
                    className="h-12 w-12 rounded-full bg-gray-300 p-4 ml-5"
                />
                <View className="flex-1">
                    <Text className="text-lg">Kushal Das</Text>
                    <Text className="text-gray-400">Your Delivery Partner</Text>
                </View>
                <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
            </SafeAreaView>
        </View>
    )
}

export default DeliveryScreen