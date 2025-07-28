import { StyleSheet } from 'react-native';

const UtilityStyels = StyleSheet.create({
    shadowForAndroid: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    row: {
        flexDirection: "row",
    }
});

export default UtilityStyels;