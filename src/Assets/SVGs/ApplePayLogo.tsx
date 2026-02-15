import React from 'react';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

interface ApplePayLogoProps {
    width?: number;
    height?: number;
}

const ApplePayLogo: React.FC<ApplePayLogoProps> = ({ width = 50, height = 22 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 50 22">
            {/* Apple logo */}
            <Path
                d="M10.3 3.5C9.7 4.2 8.8 4.8 7.9 4.7C7.8 3.8 8.2 2.8 8.8 2.2C9.4 1.5 10.4 1 11.2 0.9C11.3 1.9 10.9 2.8 10.3 3.5ZM11.2 5C9.9 4.9 8.8 5.7 8.2 5.7C7.5 5.7 6.6 5 5.5 5C4.1 5 2.8 5.8 2.1 7.1C0.6 9.6 1.7 13.3 3.2 15.4C3.9 16.4 4.8 17.5 5.9 17.5C7 17.5 7.4 16.8 8.7 16.8C10 16.8 10.3 17.5 11.5 17.5C12.6 17.5 13.5 16.5 14.2 15.4C15 14.2 15.3 13.1 15.4 12.9C15.3 12.9 13 12 13 9.3C12.9 7.1 14.8 6 14.9 6C13.8 4.4 12.1 5 11.2 5Z"
                fill="#000000"
            />
            {/* "Pay" text */}
            <SvgText
                x="19"
                y="14.5"
                fontSize="11"
                fontWeight="600"
                fill="#000000"
                letterSpacing={-0.3}
            >
                Pay
            </SvgText>
        </Svg>
    );
};

export default ApplePayLogo;
