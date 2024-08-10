import React, { useContext, useEffect } from 'react';
import { TouchableWithoutFeedback, SafeAreaView, Keyboard, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../providers/ThemeProvider';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HStack, VStack } from "@react-native-material/core";
import { useTheme, withTheme, Switch, List } from 'react-native-paper';
import Modal from 'react-native-modal';
// import Authenticate fro m '../views/Authenticate';
import Home from '../views/Home';
// import Settings from './Settings';
import { HttpRequestContext } from '../providers/httpRequest';
// import BottomSheet from './BottomSheet';

const Stack = createStackNavigator();

const NavigationStack = () => {
    const { toggleDarkMode, darkMode } = useContext(ThemeContext);
    const { colors } = useTheme();

    const handleCloseKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} onStartShouldSetResponder={handleCloseKeyboard}>
            <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.background } }}>
                <Stack.Navigator screenOptions={{
                    headerShown: false, // Hide the header for all screens
                }}>
                    {/* {
                        user
                            ?
                            <Stack.Screen name="authenticate" component={Authenticate} />
                            :
                            <Stack.Screen name="lobby" component={Lobby} />
                    }
                    <Stack.Screen name="chat" component={Chat} /> */}
                    <Stack.Screen name="home" component={Home} />
                    {/* <Stack.Screen name="authenticate" component={Authenticate} /> */}
                </Stack.Navigator>
            </NavigationContainer>
            {/* <BottomSheet /> */}
        </SafeAreaView>
    )
};
export default withTheme(NavigationStack);