import React from 'react'
import { StatusBar, Text, View } from 'react-native'

const Splash = () => {

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={"transparent"} />
            <View style={{
                flex: 1,
                backgroundColor: "black"
            }}>
                <Text style={{ color: "red" }}>Splash</Text>
            </View>
        </ >
    )
}

export default Splash