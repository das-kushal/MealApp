import { View,Text,SafeAreaView,TouchableOpacity,Image,ScrollView } from 'react-native'
import React,{ useMemo,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch,useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket,selectBasketItems,selectBasketTotal } from '../features/basketSlice'

import { Entypo } from '@expo/vector-icons';
import { urlFor } from '../sanity'

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(state => selectRestaurant(state))
    const basketTotal = useSelector(state => selectBasketTotal(state)).toFixed(2)
    const items = useSelector(state => selectBasketItems(state))
    const dispatch = useDispatch()

    const [groupedItemInBasket,setGroupedItemInBasket] = useState([])

    useMemo(() => {
        const groupedItems = items.reduce((results,item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results
        },{})
        setGroupedItemInBasket(groupedItems)
    },[items])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                {/* Header */}
                <View className="p-5 mt-6 border-b border-[#00ccbb] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="absolute top-3 right-5 bg-gray-100 p-2 rounded-full"
                    >
                        <Entypo name="circle-with-cross" size={50} color="#00ccbb" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5 ">
                    <Image
                        source={{ uri: 'https://links.papareact.com/wru' }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    <Text className="flex-1">Deliver in 30-35 min</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00ccbb]">Edit</Text>
                    </TouchableOpacity>
                </View>
                {/* {console.log(groupedItemInBasket)} */}
                {/* List of items that we are going to place order for  */}
                <ScrollView className="divide-y divide-gray-200 ">
                    {Object.entries(groupedItemInBasket).map(([key,items]) => (
                        <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                            <Text className="text-[#00ccbb]">{items.length} x</Text>
                            <Image
                                source={{ uri: urlFor(items[0].image).url() }}
                                className="h-12 w-12 rounded-full"
                            />
                            <Text className="flex-1">{items[0].name}</Text>
                            <Text className="text-gray-400">$ {items[0]?.price}</Text>
                            <TouchableOpacity>
                                <Text
                                    className="text-[#00ccbb] text-xs"
                                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                                >Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Pay section */}
                <View className="p-5 bg-white mt-5 space-y-5">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">$ {basketTotal}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">$ {5.99}</Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text>Order Total</Text>
                        <Text className="font-extrabold">$ {(Number.parseFloat(basketTotal) + 5.99).toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('PreparingOrderScreen')} className="rounded-lg bg-[#00ccbb] p-4">
                        <Text className="text-center text-white text-lg font-bold">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen