import React, { useState } from 'react'
import { View, Dimensions, Alert, StyleSheet, TouchableOpacity, TextInput, Text, StatusBar, SafeAreaView } from "react-native";

const windowWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        if (email === 'admin' || email === 'Admin' && password === 'admin') {
            // navigation.navigate()
            Alert.alert("Successful");
            navigation.push('Home')
        }
        else {
            Alert.alert("Please Enter Correct Credentials");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Text>Inventors Arena</Text>
                </View>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={styles.formText}>Enter Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            placeholder="Inventorsarena@gmail.com"
                            onChangeText={(e) => setEmail(e)}

                        />
                    </View>
                    <View>
                        <Text style={styles.formText}>Enter Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            placeholder="abcd1234"
                            secureTextEntry={true}
                            onChangeText={(e) => setPassword(e)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => loginHandler()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 4,
        width: windowWidth,
        alignItems: 'center'
    },
    formText: {
        marginLeft: 12,
        marginTop: 5,
        color: "#758283"
    },
    input: {
        height: 40,
        width: windowWidth / 1.2,
        margin: 12,
        padding: 10,
        borderBottomWidth: 1,
    },
    button: {
        height: 50,
        marginTop: 40,
        width: windowWidth / 1.2,
        backgroundColor: '#00D84A',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff"
    }
});

export default LoginScreen;
