import React, { forwardRef, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';

type ICustomActionSheetProps = {
    children: ReactNode;
    onClose?: () => void;
};

const CustomActionSheet = forwardRef<ActionSheetRef, ICustomActionSheetProps>(({ children, onClose }, ref) => {
    return (
        <ActionSheet ref={ref} containerStyle={styles.sheetWrapper} gestureEnabled onClose={onClose} indicatorStyle={{
            width: ResponsivePixels.size50,
            borderRadius: 50,
            marginTop: ResponsivePixels.size20,
            marginBottom: ResponsivePixels.size10,
        }}>
            <View style={styles.sheetContainer}>
                {children}
            </View>
        </ActionSheet>
    );
});

export default CustomActionSheet;

const styles = StyleSheet.create({
    sheetContainer: {
        paddingHorizontal: ResponsivePixels.size12,
        paddingBottom: ResponsivePixels.size20,
    },
    sheetWrapper: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
});
