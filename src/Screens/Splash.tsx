import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import MainContainer from '../common/MainContainer'
import { IMAGES } from '../Assets/Images'
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels'
import { navigate } from '../Navigators/Navigator'

const Splash = () => {

    useEffect(() => {
        setTimeout(() => {
            navigate("Intro");
        }, 2000);
    }, [])


    return (
        <>
            <MainContainer statusBarHidden >
                <View style={{
                    flex: 1,
                    backgroundColor: "black"
                }}>
                    <Image
                        source={IMAGES.splash_bg}
                        style={{
                            resizeMode: "cover",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </View>
            </MainContainer>
        </ >
    )
}

export default Splash