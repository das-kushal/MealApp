import { View,Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'

const CategoryCard = ({ imgUrl,title }) => {
    return (
        <TouchableOpacity className="relative mr-3">
            <Image source={{
                uri: imgUrl,
            }}
                className="h-20 w-20 rounded"
            />
            <Text className="absolute bottom-1 left-1 font-bold text-white bg-gray-600/50 px-1  backdrop-blur-xl rounded-xl">{title}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard