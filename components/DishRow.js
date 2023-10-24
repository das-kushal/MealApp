import { View,Text,TouchableOpacity,Image,Alert } from 'react-native'
import React,{ useState } from 'react'
import { urlFor } from '../sanity'
import { Entypo } from '@expo/vector-icons';
import { useDispatch,useSelector } from 'react-redux';
import { addToBasket,removeFromBasket,selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({
    id,
    name,
    description,
    price,
    image
}) => {
    const [isPressed,setIsPressed] = useState(false)
    const dispatch = useDispatch()
    const items = useSelector(state => selectBasketItemsWithId(state,id))

    const addItemToBasket = () => {
        dispatch(addToBasket({ id,name,description,price,image }))
    }

    const removeItemFromBasket = () => {
        if (!items.length > 0) { Alert.alert("You can't remove an item that is not in the basket"); return }
        dispatch(removeFromBasket({ id }))
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setIsPressed(!isPressed)}
                className={`bg-white border p-4  border-gray-200 ${isPressed && 'border-b-0'}`}
            >
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            $ {price}
                        </Text>
                    </View>
                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: "#f3f3f4"
                            }}
                            source={{ uri: urlFor(image).url() }}
                            className="h-20 w-20 bg-gray-300 p-4"
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row space-x-2 items-center pb-3">
                        <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
                            <Entypo name="circle-with-minus" size={40} color={items.length > 0 ? "#00ccbb" : "gray"} />
                        </TouchableOpacity>

                        <Text>{items.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <Entypo name="circle-with-plus" size={40} color="#00ccbb" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

export default DishRow