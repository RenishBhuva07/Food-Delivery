import React from 'react';
import Svg, { Path, Text as SvgText, G } from 'react-native-svg';

interface PaypalLogoProps {
    width?: number;
    height?: number;
}

const PaypalLogo: React.FC<PaypalLogoProps> = ({ width = 50, height = 20 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 80 24">
            {/* PayPal double-P icon */}
            <G transform="translate(0, 2)">
                {/* Back P shape (lighter blue) */}
                <Path
                    d="M14.5 2.5C13.8 1 12 0.2 9.5 0.2H3.5C3 0.2 2.6 0.6 2.5 1.1L0 16.5C0 16.9 0.3 17.2 0.6 17.2H4.2L5 12.5V12.7C5.1 12.2 5.5 11.8 6 11.8H7.8C11.5 11.8 14.3 10.2 15.2 5.8C15.2 5.6 15.2 5.4 15.3 5.2C15.1 5.1 15.1 5.1 15.3 5.2C15.5 3.9 15.3 3 14.5 2.5Z"
                    fill="#27346A"
                />
                {/* Front P shape (darker blue) */}
                <Path
                    d="M15.3 5.2C15.2 5.4 15.2 5.6 15.2 5.8C14.3 10.2 11.5 11.8 7.8 11.8H6C5.5 11.8 5.1 12.2 5 12.7L3.8 19.8C3.8 20.1 4 20.4 4.4 20.4H7.5C7.9 20.4 8.3 20.1 8.4 19.7V19.5L9 15.8V15.6C9.1 15.2 9.5 14.8 9.9 14.8H10.5C13.7 14.8 16.2 13.4 16.9 9.6C17.3 8 17.1 6.7 16.3 5.8C16 5.5 15.7 5.3 15.3 5.2Z"
                    fill="#2790C3"
                />
            </G>
            {/* PayPal text */}
            <SvgText
                x="22"
                y="16.5"
                fontSize="12"
                fontWeight="700"
                fontStyle="italic"
                fill="#27346A"
            >
                Pay
            </SvgText>
            <SvgText
                x="46"
                y="16.5"
                fontSize="12"
                fontWeight="700"
                fontStyle="italic"
                fill="#2790C3"
            >
                Pal
            </SvgText>
        </Svg>
    );
};

export default PaypalLogo;
