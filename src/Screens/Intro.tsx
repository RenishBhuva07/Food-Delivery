import React, { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainContainer from '../common/MainContainer';
import { IMAGES } from '../Assets/Images';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { navigate } from '../Navigators/Navigator';

const { width, height } = Dimensions.get('window');

const Intro = () => {

    const [introSlides, setIntroSlides] = useState([
        {
            id: 1,
            image: IMAGES.splash_bg,
            title: 'We serve incomparable delicacies',
            subtitle: '1 - All the best restaurants with their top menu waiting for you, they can\'t wait for your order',
        },
        {
            id: 2,
            image: IMAGES.splash_bg,
            title: 'We serve incomparable delicacies',
            subtitle: '2 - All the best restaurants with their top menu waiting for you, they can\'t wait for your order',
        },
        {
            id: 3,
            image: IMAGES.splash_bg,
            title: 'We serve incomparable delicacies',
            subtitle: '3 - All the best restaurants with their top menu waiting for you, they can\'t wait for your order',
        },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < introSlides.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            handleSkip();
        }
    };

    const handleSkip = () => navigate('Login');


    const handleScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
        setCurrentIndex(index);

        if (currentIndex === introSlides.length - 1) {
            navigate("Login");
        }
    };

    const renderDots = () => {
        return (
            <View style={styles.dotsContainer}>
                {introSlides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: index === currentIndex ? Colors.DefaultWhite : 'rgba(255, 255, 255, 0.3)',
                                width: index === currentIndex ? 24 : 8,
                                height: 8,
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <MainContainer statusBarHidden >
            <View style={styles.container}>

                <ImageBackground
                    source={introSlides[currentIndex].image}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <View style={styles.overlay} />

                    <View style={styles.contentCard}>
                        <View>
                            <Text style={styles.title}>{introSlides[currentIndex].title}</Text>
                            <Text style={styles.subtitle}>{introSlides[currentIndex].subtitle}</Text>
                            <View style={styles.bottomSection}>
                                {renderDots()}
                            </View>
                        </View>

                        <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={handleSkip}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                                <Text style={styles.nextText}>
                                    {currentIndex === introSlides.length - 1 ? 'Get Started' : 'Next'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '500',
    },
    slide: {
        width: width,
        height: height,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    contentCard: {
        backgroundColor: Colors.SunburstFlame,
        marginHorizontal: ResponsivePixels.size20,
        marginBottom: ResponsivePixels.size50,
        borderRadius: 50,
        padding: ResponsivePixels.size24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        height: ResponsivePixels.size350,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: ResponsivePixels.size12,
        lineHeight: 30,
        marginHorizontal: ResponsivePixels.size20,
    },
    subtitle: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        textAlign: 'center',
        lineHeight: 22,
        opacity: 0.9,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: ResponsivePixels.size24,
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: ResponsivePixels.size8,
        borderRadius: 4,
        marginHorizontal: ResponsivePixels.size4,
    },
    nextButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: ResponsivePixels.size20,
        paddingVertical: ResponsivePixels.size10,
        borderRadius: 20,
        minWidth: ResponsivePixels.size60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextText: {
        color: Colors.DefaultWhite,
        fontSize: ResponsivePixels.size16,
        fontWeight: '600',
    },
    background: {
        width: width,
        height: height,
        justifyContent: 'flex-end',
    },
});

export default Intro
