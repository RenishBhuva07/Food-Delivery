import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    Keyboard,
    FlatList,
} from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import CustomActionSheet from '../common/CustomActionSheet';
import { Colors } from '../Assets/StyleUtilities/Colors';
import ResponsivePixels from '../Assets/StyleUtilities/ResponsivePixels';
import { Typography } from '../Theme/Typographys';
import { themes } from '../Assets/StyleUtilities/CommonStyleSheets/theme';
import { FloatingTextInput } from '../common/FloatingTextInput';
import CustomButton from '../common/CustomButton';
import { IMAGES } from '../Assets/Images';
import ActionSheetStyles from '../Assets/StyleUtilities/CommonStyleSheets/ActionSheetStyles';
import {
    ArrowLeft,
    Check,
    LogIn,
    Mail,
    Plus,
    Shield,
    UserCircle,
    UserPlus,
} from 'lucide-react-native';

export type Account = {
    id: string;
    name: string;
    email: string;
    avatar?: any;
    isActive: boolean;
};

export type AddAccountSheetRef = {
    show: () => void;
    hide: () => void;
};

type AddAccountSheetProps = {
    onAccountSwitch?: (account: Account) => void;
    onAccountAdded?: (account: Account) => void;
};

const INITIAL_ACCOUNTS: Account[] = [
    {
        id: '1',
        name: 'Albert Stevano Bajefski',
        email: 'Albertstevano@gmail.com',
        avatar: null,
        isActive: true,
    },
];

const AddAccountSheet = forwardRef<AddAccountSheetRef, AddAccountSheetProps>(
    ({ onAccountSwitch, onAccountAdded }, ref) => {
        const actionSheetRef = useRef<ActionSheetRef>(null);
        const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
        const [showLoginForm, setShowLoginForm] = useState(false);
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [showPassword, setShowPassword] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const slideAnim = useRef(new Animated.Value(0)).current;
        const fadeAnim = useRef(new Animated.Value(1)).current;
        const passwordRef = useRef<TextInput>(null);

        useImperativeHandle(ref, () => ({
            show: () => {
                setShowLoginForm(false);
                setEmail('');
                setPassword('');
                slideAnim.setValue(0);
                fadeAnim.setValue(1);
                actionSheetRef.current?.show();
            },
            hide: () => {
                actionSheetRef.current?.hide();
            },
        }));

        const animateToLoginForm = useCallback(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setShowLoginForm(true);
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 250,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }, [fadeAnim, slideAnim]);

        const animateToAccountList = useCallback(() => {
            Keyboard.dismiss();
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setShowLoginForm(false);
                setEmail('');
                setPassword('');
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 250,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            });
        }, [fadeAnim, slideAnim]);

        const handleSwitchAccount = useCallback(
            (account: Account) => {
                const updatedAccounts = accounts.map(acc => ({
                    ...acc,
                    isActive: acc.id === account.id,
                }));
                setAccounts(updatedAccounts);
                onAccountSwitch?.(account);

                setTimeout(() => {
                    actionSheetRef.current?.hide();
                }, 500);
            },
            [accounts, onAccountSwitch],
        );

        const handleAddAccount = useCallback(() => {
            if (!email.trim() || !password.trim()) return;

            setIsLoading(true);

            // Simulate API call
            setTimeout(() => {
                const newAccount: Account = {
                    id: Date.now().toString(),
                    name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    email: email.trim(),
                    avatar: null,
                    isActive: false,
                };

                const updatedAccounts = [...accounts, newAccount];
                setAccounts(updatedAccounts);
                onAccountAdded?.(newAccount);
                setIsLoading(false);
                setEmail('');
                setPassword('');

                // Switch to newly added account
                const switchedAccounts = updatedAccounts.map(acc => ({
                    ...acc,
                    isActive: acc.id === newAccount.id,
                }));
                setAccounts(switchedAccounts);

                // Animate back to account list
                animateToAccountList();
            }, 1500);
        }, [email, password, accounts, onAccountAdded, animateToAccountList]);

        const handleClose = useCallback(() => {
            setShowLoginForm(false);
            setEmail('');
            setPassword('');
            slideAnim.setValue(0);
            fadeAnim.setValue(1);
        }, [slideAnim, fadeAnim]);

        const renderAccountItem = ({ item }: { item: Account }) => (
            <TouchableOpacity
                style={[
                    styles.accountCard,
                    item.isActive && styles.accountCardActive,
                ]}
                onPress={() => handleSwitchAccount(item)}
                activeOpacity={0.7}
            >
                <View style={styles.accountCardContent}>
                    <View
                        style={[
                            styles.avatarWrapper,
                            item.isActive && styles.avatarWrapperActive,
                        ]}
                    >
                        {item.avatar ? (
                            <Image source={item.avatar} style={styles.accountAvatar} />
                        ) : (
                            <UserCircle
                                size={28}
                                color={item.isActive ? Colors.SunburstFlame : Colors.SteelMist}
                            />
                        )}
                    </View>

                    <View style={styles.accountInfo}>
                        <Text
                            style={[
                                styles.accountName,
                                item.isActive && styles.accountNameActive,
                            ]}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <Text style={styles.accountEmail} numberOfLines={1}>
                            {item.email}
                        </Text>
                    </View>

                    {item.isActive && (
                        <View style={styles.activeIndicator}>
                            <Check size={14} color={Colors.DefaultWhite} strokeWidth={3} />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );

        const renderAccountList = () => (
            <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.headerRow}>
                    <Text style={ActionSheetStyles.actionSheetTitle}>Your Accounts</Text>
                </View>

                <Text style={ActionSheetStyles.description}>
                    Switch between accounts or add a new one to manage multiple profiles.
                </Text>

                {/* Active Account Label */}
                <View style={styles.sectionLabelRow}>
                    <Shield size={14} color={Colors.SunburstFlame} />
                    <Text style={styles.sectionLabel}>Signed In</Text>
                </View>

                <FlatList
                    data={accounts}
                    renderItem={renderAccountItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={styles.accountsList}
                />

                {/* Add New Account Button */}
                <TouchableOpacity
                    style={styles.addNewAccountButton}
                    onPress={animateToLoginForm}
                    activeOpacity={0.7}
                >
                    <View style={styles.addIconWrapper}>
                        <Plus size={20} color={Colors.SunburstFlame} strokeWidth={2.5} />
                    </View>
                    <Text style={styles.addNewAccountText}>Add New Account</Text>
                    <LogIn size={18} color={Colors.SteelMist} />
                </TouchableOpacity>

                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Text style={styles.infoBannerText}>
                        Adding a new account will not remove your current account. You can switch between accounts anytime.
                    </Text>
                </View>
            </Animated.View>
        );

        const renderLoginForm = () => (
            <Animated.View style={{ opacity: fadeAnim }}>
                {/* Back Button + Title */}
                <View style={styles.loginHeader}>
                    <TouchableOpacity
                        onPress={animateToAccountList}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={22} color={Colors.NoirBlack} />
                    </TouchableOpacity>
                    <Text style={ActionSheetStyles.actionSheetTitle}>Add Account</Text>
                    <View style={{ width: 40 }} />
                </View>

                <Text style={[ActionSheetStyles.description, { marginTop: ResponsivePixels.size4 }]}>
                    Sign in with your existing account credentials to add it here.
                </Text>

                {/* Login Form */}
                <View style={styles.formContainer}>
                    <FloatingTextInput
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        onSubmitEditing={() => passwordRef?.current?.focus()}
                        returnKeyType="next"
                        containerStyle={{ marginTop: ResponsivePixels.size20 }}
                    />

                    <FloatingTextInput
                        ref={passwordRef}
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        keyboardType="default"
                        rightIcon={showPassword ? IMAGES.ic_Eye_Off : IMAGES.ic_Eye_On}
                        onPressRightIcon={() => setShowPassword(!showPassword)}
                        secureTextEntry={!showPassword}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        containerStyle={{ marginTop: ResponsivePixels.size10 }}
                    />
                </View>

                {/* Sign In Button */}
                <View style={styles.signInButtonWrapper}>
                    <CustomButton
                        title={isLoading ? 'Signing in...' : 'Sign In & Add'}
                        onPress={handleAddAccount}
                        disabled={!email.trim() || !password.trim() || isLoading}
                        icon="LogIn"
                    />
                </View>

                {/* Social Login Divider */}
                <View style={styles.socialDividerRow}>
                    <View style={styles.socialDivider} />
                    <Text style={styles.socialDividerText}>Or continue with</Text>
                    <View style={styles.socialDivider} />
                </View>

                {/* Social Login Buttons */}
                <View style={styles.socialButtonsRow}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={IMAGES.ic_Google}
                            style={styles.socialIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={IMAGES.ic_Facebook}
                            style={styles.socialIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={IMAGES.ic_Apple}
                            style={styles.socialIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );

        return (
            <CustomActionSheet ref={actionSheetRef} onClose={handleClose}>
                <View style={styles.sheetContent}>
                    {showLoginForm ? renderLoginForm() : renderAccountList()}
                </View>
            </CustomActionSheet>
        );
    },
);

export default AddAccountSheet;

const styles = StyleSheet.create({
    sheetContent: {
        paddingHorizontal: ResponsivePixels.size4,
        paddingBottom: ResponsivePixels.size10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: ResponsivePixels.size6,
        marginBottom: ResponsivePixels.size10,
    },
    sectionLabel: {
        color: Colors.SunburstFlame,
        ...Typography.bodySmallSemiBold,
    },
    accountsList: {
        gap: ResponsivePixels.size10,
    },
    accountCard: {
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        borderRadius: 16,
        padding: ResponsivePixels.size14,
        backgroundColor: Colors.DefaultWhite,
    },
    accountCardActive: {
        borderColor: Colors.SunburstFlame,
        backgroundColor: Colors.SunlitAlmond,
    },
    accountCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        width: ResponsivePixels.size44,
        height: ResponsivePixels.size44,
        borderRadius: 22,
        backgroundColor: Colors.FrostedLilacMist,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    avatarWrapperActive: {
        backgroundColor: Colors.SunburstFlameFaded,
    },
    accountAvatar: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 20,
    },
    accountInfo: {
        flex: 1,
        gap: ResponsivePixels.size2,
    },
    accountName: {
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    accountNameActive: {
        color: Colors.SunburstFlame,
    },
    accountEmail: {
        color: Colors.SteelMist,
        ...Typography.bodySmallRegular,
    },
    activeIndicator: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
        borderRadius: 12,
        backgroundColor: Colors.SunburstFlame,
        alignItems: 'center',
        justifyContent: 'center',
        ...themes.shadows.light,
    },
    addNewAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: ResponsivePixels.size14,
        paddingHorizontal: ResponsivePixels.size14,
        borderWidth: 1.5,
        borderColor: Colors.CloudWhisper,
        borderRadius: 16,
        borderStyle: 'dashed',
        marginTop: ResponsivePixels.size16,
        backgroundColor: Colors.FrostedHaze,
    },
    addIconWrapper: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 20,
        backgroundColor: Colors.SunburstFlameFaded,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: ResponsivePixels.size12,
    },
    addNewAccountText: {
        flex: 1,
        color: Colors.NoirBlack,
        ...Typography.bodyMediumSemiBold,
    },
    infoBanner: {
        marginTop: ResponsivePixels.size16,
        backgroundColor: Colors.FrostedLilacMist,
        borderRadius: 12,
        paddingVertical: ResponsivePixels.size10,
        paddingHorizontal: ResponsivePixels.size14,
    },
    infoBannerText: {
        color: Colors.SteelMist,
        textAlign: 'center',
        ...Typography.bodySmallRegular,
    },
    loginHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: ResponsivePixels.size4,
    },
    backButton: {
        width: ResponsivePixels.size40,
        height: ResponsivePixels.size40,
        borderRadius: 12,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        marginBottom: ResponsivePixels.size10,
    },
    signInButtonWrapper: {
        marginTop: ResponsivePixels.size10,
        marginBottom: ResponsivePixels.size20,
    },
    socialDividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: ResponsivePixels.size16,
    },
    socialDivider: {
        borderTopWidth: 1,
        borderTopColor: Colors.CloudWhisper,
        flex: 1,
    },
    socialDividerText: {
        color: Colors.SteelMist,
        paddingHorizontal: ResponsivePixels.size10,
        ...Typography.bodySmallMedium,
    },
    socialButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: ResponsivePixels.size16,
    },
    socialButton: {
        width: ResponsivePixels.size48,
        height: ResponsivePixels.size48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.MoonDust,
        backgroundColor: Colors.FrostedHaze,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        width: ResponsivePixels.size24,
        height: ResponsivePixels.size24,
    },
});
