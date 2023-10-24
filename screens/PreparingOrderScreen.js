import { View,Text,SafeAreaView } from 'react-native'
import React,{ useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
// import * as Progress from 'react-native-progress';  this is giving error //TODO

const PreparingOrderScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DeliveryScreen')
        },2000)
    },[])
    return (
        <SafeAreaView className="bg-[#00ccbb] flex-1 justify-center items-center">
            <Animatable.Image
                source={require('../assets/orderLoading.gif')}
                animation={'slideInUp'}
                iterationCount={1}
                className="w-44 h-44"
            />

            <Animatable.Text
                animation={'slideInUp'}
                iterationCount={1}
                className="text-white text-lg my-10 text-center font-bold"
            >
                Waiting for Restaurant to accept your order 😄!
            </Animatable.Text>

            {/* <Progress.Circle size={60} indeterminate={true} color='white' /> */}
        </SafeAreaView>
    )
}

export default PreparingOrderScreen