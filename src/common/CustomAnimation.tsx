import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import ResponsivePixels from "../Assets/StyleUtilities/ResponsivePixels";

interface IProps {
    animationFile: any;
    animationStyle?: any;
}
export const CustomAnimation = (props: IProps) => {
    const { animationFile, animationStyle } = props;
    return (
        <LottieView
            style={animationStyle ? animationStyle : styles.animationView}
            source={animationFile}
            autoPlay={true}
            loop={true}
        />
    );
};
const styles = StyleSheet.create({
    animationView: {
        height: ResponsivePixels.size100,
        width: ResponsivePixels.size100,
    },
});
