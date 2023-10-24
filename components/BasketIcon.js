import { View,Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems,selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const items = useSelector(state => selectBasketItems(state))
    const navigation = useNavigation()
    const basketTotal = useSelector(state => selectBasketTotal(state))

    if (items.length === 0) return null

    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity onPress={() => navigation.navigate('Basket')} className="mx-5 bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1">
                <Text className="text-white font-extrabold text-lg  bg-[#01a296] px-2 py-1">
                    {items.length}
                </Text>
                <Text className="text-white font-extrabold text-lg text-center flex-1">View Basket</Text>
                <Text className="text-white font-extrabold text-lg ">$ {basketTotal.toFixed(2)}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon