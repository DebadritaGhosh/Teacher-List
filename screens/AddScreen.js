import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import shortid from 'shortid';
const windowWidth = Dimensions.get('window').width;

const AddScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");

    const addTeacher = async () => {
        try {
            if (!name || !subject || !email) {
                console.log("Please add all fields");
            }
            const teachersList = {
                id: shortid.generate(),
                name: name,
                subject: subject,
                email: email
            }

            const storedValue = await AsyncStorage.getItem('@teachers_list');
            const prevList = await JSON.parse(storedValue);

            if (!prevList) {
                const newList = [teachersList];
                await AsyncStorage.setItem('@teachers_list', JSON.stringify(newList));
            } else {
                prevList.push(teachersList);
                await AsyncStorage.setItem('@teachers_list', JSON.stringify(prevList));
            }

            navigation.navigate("Home");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Text>Add Teacher</Text>
                </View>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={styles.formText}>Enter Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Debadrita Ghosh"
                            value={name}
                            onChangeText={(e) => setName(e)}

                        />
                    </View>
                    <View>
                        <Text style={styles.formText}>Enter Subject</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="JavaScript"
                            value={subject}
                            onChangeText={(e) => setSubject(e)}
                        />
                    </View>
                    <View>
                        <Text style={styles.formText}>Enter Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="debadrita.ghosh2010@gmail.com"
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={addTeacher}>
                        <Text style={styles.buttonText}>Add</Text>
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

export default AddScreen;
