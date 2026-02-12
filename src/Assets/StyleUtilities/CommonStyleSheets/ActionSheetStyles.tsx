import { StyleSheet } from 'react-native';
import { Colors } from '../Colors';
import ResponsivePixels from '../ResponsivePixels';
import { Typography } from '../../../Theme/Typographys';

const ActionSheetStyles = StyleSheet.create({
    actionSheetContent: {
        // flex: 1,
    },
    description: {
        color: Colors.SteelMist,
        marginBottom: ResponsivePixels.size24,
        ...Typography.bodyMediumMedium
    },
    actionSheetTitle: {
        color: Colors.NoirBlack,
        marginBottom: ResponsivePixels.size12,
        ...Typography.h5SemiBold
    },
});

export default ActionSheetStyles;
