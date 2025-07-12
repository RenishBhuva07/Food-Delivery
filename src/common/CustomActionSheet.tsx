import React, { forwardRef, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';

type ICustomActionSheetProps = {
    children: ReactNode;
};

const CustomActionSheet = forwardRef<ActionSheetRef, ICustomActionSheetProps>(({ children }, ref) => {
    return (
        <ActionSheet ref={ref} containerStyle={styles.sheetWrapper} gestureEnabled indicatorStyle={{
            width: ResponsivePixels.size50,
            borderRadius: 50,
            marginVertical: ResponsivePixels.size15,
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
        padding: ResponsivePixels.size20,
    },
    sheetWrapper: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
});
