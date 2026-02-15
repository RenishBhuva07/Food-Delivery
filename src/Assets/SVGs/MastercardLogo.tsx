import React from 'react';
import Svg, { Circle, Text as SvgText, Rect, Defs, ClipPath, G } from 'react-native-svg';

interface MastercardLogoProps {
    width?: number;
    height?: number;
}

const MastercardLogo: React.FC<MastercardLogoProps> = ({ width = 50, height = 32 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 50 32">
            {/* Red circle */}
            <Circle cx="18" cy="13" r="10" fill="#EB001B" />
            {/* Orange/Yellow circle */}
            <Circle cx="32" cy="13" r="10" fill="#F79E1B" />
            {/* Overlap area */}
            <Defs>
                <ClipPath id="overlap">
                    <Circle cx="18" cy="13" r="10" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#overlap)">
                <Circle cx="32" cy="13" r="10" fill="#FF5F00" />
            </G>
            {/* Mastercard text */}
            <SvgText
                x="25"
                y="29"
                textAnchor="middle"
                fontSize="5"
                fontWeight="500"
                fill="#000000"
                letterSpacing={0.5}
            >
                mastercard
            </SvgText>
        </Svg>
    );
};

export default MastercardLogo;
