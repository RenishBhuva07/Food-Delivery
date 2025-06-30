import { StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import ResponsivePixels from '../ResponsivePixels';

const ActionSheetStyles = StyleSheet.create({
    actionSheetContent: {
        // flex: 1,
    },
    description: {
        fontSize: ResponsivePixels.size15,
        color: Colors.SteelMist,
        lineHeight: 24,
        marginBottom: ResponsivePixels.size40,
    },
    actionSheetTitle: {
        fontSize: ResponsivePixels.size26,
        fontWeight: '600',
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size10,
    },
});

export default ActionSheetStyles;
