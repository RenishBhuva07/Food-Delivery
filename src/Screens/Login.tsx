import React from 'react'
import MainContainer from '../common/MainContainer'
import { Text, View } from 'react-native'

const Login = () => {
    return (
        <>
            <MainContainer statusBarHidden>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0'
                }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login Screen</Text>
                </View>
            </MainContainer>
        </>
    )
}

export default Login
