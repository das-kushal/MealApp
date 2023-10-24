import { View,Text,SafeAreaView,Image,TextInput,ScrollView,FlatList } from 'react-native'
import React,{ useEffect,useLayoutEffect,useState } from 'react'
import { Entypo,FontAwesome,Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';
// import featuredCategories from '../data/featuredCategories';

const HomeScreen = () => {
    const navigation = useNavigation();

    const [featuredCategories,setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    },[])

    useEffect(() => {
        sanityClient.fetch(`*[_type=="featured"] {
        ...,
        restaurants[]->{
            ...,
            dishes[]->
        }
}`).then((data) => {
            setFeaturedCategories(data)
        }).catch(console.error)
    },[])


    return (
        <SafeAreaView className=" bg-white pt-11 pb-11 ">
            {/* Header  */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
                <Image
                    source={{ uri: "https://links.papareact.com/wru" }}
                    className="h-7 w-7 bg-gray-300 rounded-full p-4"
                />
                <View className="flex-1">
                    <Text className="font-bold text-xs text-gray-400">Deliver Now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <Entypo name="chevron-down" size={20} color="#00cccc" />
                    </Text>
                </View>
                <FontAwesome name="user-o" size={35} color="#00ccbb" />
            </View>
            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <Feather name="search" size={20} color="gray" />
                    <TextInput placeholder='Restaurants and cuisines' />
                </View>
                <Feather name="settings" size={20} color="#00ccbb" />
            </View>

            {/* Body */}
            <ScrollView
                className="bg-gray-100 "
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {/* Categories */}
                <Categories />
                {/* Featured Rows */}

                {featuredCategories?.map((category) => {
                    return (
                        <FeaturedRow
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                        />
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen