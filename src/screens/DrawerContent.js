import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../assets/StyleSheet/DrawerNavigationStyleSheet';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    SETTINGS_SCREEN_NAME,
    COURSE_DETAILS_SCREEN_NAME,
    HOME_SCREEN_NAME,
    NOTIFICATIONS_SCREEN_NAME
} from '../constants/routeNames';
import auth from '@react-native-firebase/auth';
import { loginHandler } from '../api/LoginAPI';

export default function DrawerContent(props) {
    const [isLoggined, setIsLoggined] = useState(false);
    const [user, setUser] = useState({name: "", email:""} );
    // const {setUser}=()=>{ 

    // }
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1025591701711-p3njvopj68jsdnp8np4u46dte3g0o9ch.apps.googleusercontent.com',
            offlineAccess: true,
        })
    }, []);
    const login = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            const userAuth = auth().signInWithCredential(googleCredential);
            userAuth.then((data) => {
                console.log(data);
                setUser({
                    name: data.additionalUserInfo.profile.name,
                    email: data.additionalUserInfo.profile.email,
                })
                console.log(idToken);
                loginHandler(idToken,user, setUser);
                setIsLoggined(true);
            })
                .catch((error) => {
                    console.log(error.message);
                })
        } catch (error) {
            console.log(error.message)
        }
    }
    const logout = async () => {
        try {
            await GoogleSignin.signOut();
            setIsLoggined(false);
        } catch (error) {
            console.error(error);
        }
    };

    const _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            // Set User Info if user is already signed in
            _getCurrentUserInfo();
        } else {
            console.log('Please Login');
        }
        setGettingLoginStatus(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    {isLoggined ?
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={user?.data?.avatar?{ uri:user.data.avatar }:require('../assets/icons/profile.png')}
                                    // source={{ uri:"https://lh3.googleusercontent.com/a/AATXAJwQ5IH150mha4oO8bV1OnJglk2Xx1DkaPZOu_aU=s96-c" }}
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{user.name}</Title>
                                    <Caption style={styles.caption}>{user.email}</Caption>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>Class </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption]}> 20GIT</Paragraph>
                                </View>
                                <View style={styles.section}>
                                    <Caption style={styles.caption}>Der. </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>Computer Science</Paragraph>
                                </View>
                            </View>
                        </View>
                        : <GoogleSigninButton
                            style={{ width: 280, height: 55 }}
                            text="Login with google"
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={login}
                        // disabled={this.state.isSigninInProgress} 
                        />
                    }

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate(HOME_SCREEN_NAME) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bell-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Notificattion"
                            onPress={() => { props.navigation.navigate(NOTIFICATIONS_SCREEN_NAME) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cog-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Setting"
                            onPress={() => { props.navigation.navigate(SETTINGS_SCREEN_NAME) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-check-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => { props.navigation.navigate('SupportScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Courses">
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="notebook-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Android Studio"
                            onPress={() => { props.navigation.navigate(COURSE_DETAILS_SCREEN_NAME) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="notebook-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Android Studio"
                            onPress={() => { props.navigation.navigate(COURSE_DETAILS_SCREEN_NAME) }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="notebook-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Android Studio"
                            onPress={() => { props.navigation.navigate(COURSE_DETAILS_SCREEN_NAME) }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {isLoggined ?
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={logout}
                    />
                </Drawer.Section>
                : null
            }
        </View>
    );
}
