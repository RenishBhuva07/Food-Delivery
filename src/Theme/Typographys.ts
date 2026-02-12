import { Fonts } from "./fonts";


export const Typography = {
    // 🔹 _______________________________Headings_____________________________

    // H1
    h1Bold: {
        fontFamily: Fonts.bold,
        fontSize: 64,
        lineHeight: 72,
    },
    h1SemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 64,
        lineHeight: 72,
    },
    h1Medium: {
        fontFamily: Fonts.medium,
        fontSize: 64,
        lineHeight: 72,
    },
    h1Regular: {
        fontFamily: Fonts.regular,
        fontSize: 64,
        lineHeight: 72,
    },

    // H2
    h2Bold: {
        fontFamily: Fonts.bold,
        fontSize: 48,
        lineHeight: 56,
    },
    h2SemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 48,
        lineHeight: 56,
    },
    h2Medium: {
        fontFamily: Fonts.medium,
        fontSize: 48,
        lineHeight: 56,
    },
    h2Regular: {
        fontFamily: Fonts.regular,
        fontSize: 48,
        lineHeight: 56,
    },

    // H3
    h3Bold: {
        fontFamily: Fonts.bold,
        fontSize: 40,
        lineHeight: 48,
    },

    h3SemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 40,
        lineHeight: 48,
    },

    h3Medium: {
        fontFamily: Fonts.medium,
        fontSize: 40,
        lineHeight: 48,
    },

    h3Regular: {
        fontFamily: Fonts.regular,
        fontSize: 40,
        lineHeight: 48,
    },

    // H4
    h4Bold: {
        fontFamily: Fonts.bold,
        fontSize: 32,
        lineHeight: 40,
    },

    h4SemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 32,
        lineHeight: 40,
    },

    h4Medium: {
        fontFamily: Fonts.medium,
        fontSize: 32,
        lineHeight: 40,
    },

    h4Regular: {
        fontFamily: Fonts.regular,
        fontSize: 32,
        lineHeight: 40,
    },

    // H5
    h5Bold: {
        fontFamily: Fonts.bold,
        fontSize: 24,
        lineHeight: 32,
    },

    h5SemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 24,
        lineHeight: 32,
    },

    h5Medium: {
        fontFamily: Fonts.medium,
        fontSize: 24,
        lineHeight: 32,
    },

    h5Regular: {
        fontFamily: Fonts.regular,
        fontSize: 24,
        lineHeight: 32,
    },

    // H6
    h6Bold: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        lineHeight: 26,
    },

    h6SemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 18,
        lineHeight: 26,
    },

    h6Medium: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        lineHeight: 26,
    },

    h6Regular: {
        fontFamily: Fonts.regular,
        fontSize: 18,
        lineHeight: 26,
    },

    // 🔹 _______________________________Body_____________________________

    // 🔹 Large
    bodyLargeRegular: {
        fontFamily: Fonts.regular,
        fontSize: 16,
        lineHeight: 24,
    },
    bodyLargeMedium: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        lineHeight: 24,
    },
    bodyLargeSemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        lineHeight: 24,
    },
    bodyLargeBold: {
        fontFamily: Fonts.bold,
        fontSize: 16,
        lineHeight: 24,
    },

    // 🔹 Medium
    bodyMediumRegular: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        lineHeight: 20,
    },

    bodyMediumMedium: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        lineHeight: 20,
    },
    bodyMediumSemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 14,
        lineHeight: 20,
    },
    bodyMediumBold: {
        fontFamily: Fonts.bold,
        fontSize: 14,
        lineHeight: 20,
    },

    // 🔹 Small
    bodySmallRegular: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        lineHeight: 16,
    },

    bodySmallMedium: {
        fontFamily: Fonts.medium,
        fontSize: 12,
        lineHeight: 16,
    },
    bodySmallSemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 12,
        lineHeight: 16,
    },

    bodySmallBold: {
        fontFamily: Fonts.bold,
        fontSize: 12,
        lineHeight: 16,
    },

    // 🔹 Super Small
    bodySuperSmallRegular: {
        fontFamily: Fonts.regular,
        fontSize: 10,
        lineHeight: 16,
    },

    bodySuperSmallMedium: {
        fontFamily: Fonts.medium,
        fontSize: 10,
        lineHeight: 16,
    },
    bodySuperSmallSemiBold: {
        fontFamily: Fonts.semiBold,
        fontSize: 10,
        lineHeight: 16,
    },

    bodySuperSmallBold: {
        fontFamily: Fonts.bold,
        fontSize: 10,
        lineHeight: 16,
    },
};

import { Platform } from 'react-native';
import { Colors } from "../Assets/StyleUtilities/Colors";

export const ShadowStyles = {
    shadow: {
        shadowColor: Platform.OS === 'android' ? Colors.SteelMist : "rgba(0,0,0,0.07)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 7,
    }
};
