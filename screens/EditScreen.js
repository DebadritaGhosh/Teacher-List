import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useEffect } from 'react/cjs/react.development';


const windowWidth = Dimensions.get('window').width;
const EditScreen = ({ navigation, route }) => {

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState(null);

    const editedTeacher = async () => {

        try {
            if (!name || !subject || !email) {
                console.log("please Enter Something");
            }
            // const teacherListUpdate = {
            //     id,
            //     name,
            //     subject,
            //     email
            // }

            const storedValue = await AsyncStorage.getItem('@teachers_list');
            const list = await JSON.parse(storedValue);

            list.map((teacher) => {
                if (teacher.id == id) {
                    teacher.name = name;
                    teacher.subject = subject;
                    teacher.email = email;
                }
                return teacher;
            })


            await AsyncStorage.setItem('@teachers_list', JSON.stringify(list))

            navigation.navigate("Home");
        }
        catch (error) {
            console.log(error);
        }


    }
    useEffect(() => {
        const { teacher } = route.params;
        const { id, name, subject, email } = teacher;
        setId(id);
        setName(name);
        setSubject(subject);
        setEmail(email);
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Text>Edit Teacher</Text>
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
                            placeholder="email@email.com"
                            value={email}
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={editedTeacher}>
                        <Text style={styles.buttonText}>Update</Text>
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

export default EditScreen
