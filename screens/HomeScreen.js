import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

let W = Dimensions.get('window').width;
let H = Dimensions.get('window').height;

const HomeScreen = ({ navigation, route }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    const teachersList = async () => {
        setLoading(true);
        const storedValue = await AsyncStorage.getItem('@teachers_list');
        if (!storedValue) {
            setTeachers([]);
        }
        const list = JSON.parse(storedValue);
        setTeachers(list);
        setLoading(false);
    }

    const deleteTeacher = async (id) => {
        const newList = await teachers.filter((list) => list.id !== id);
        await AsyncStorage.setItem('@teachers_list', JSON.stringify(newList));
        setTeachers(newList);
    }

    const deleteAll = async () => {
        await AsyncStorage.setItem('@teachers_list', JSON.stringify([]));
        setTeachers([]);
    }

    useEffect(() => {
        teachersList();
    }, [isFocused])

    if (loading) {
        return (
            <View>
                <Text>
                    Loading.......
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <ScrollView style={styles.mainContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.sButton} onPress={() => navigation.navigate('Add')}>
                        <Text style={styles.buttonText}>Add Teacher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lButton} onPress={deleteAll}>
                        <Text style={styles.buttonText}>Delete All Teachers</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.productsHeading}> Teacher's List </Text>

                {!teachers || teachers.length == 0 ? (
                    <View style={styles.noData}>
                        <Text>Teacher List Empty</Text>
                    </View>
                ) : (
                    <>
                        {
                            teachers.map((teacher) => (
                                <View key={teacher.id} style={styles.productContainer} >
                                    <View style={styles.productDetails}>
                                        <Text> Name : {teacher.name}</Text>
                                        <Text> Subject : {teacher.subject}</Text>
                                        <Text> Email : {teacher.email}</Text>
                                    </View>
                                    <View style={styles.productButtonContainer}>
                                        <TouchableOpacity style={styles.productActionEditButton} onPress={() => navigation.navigate("Edit", { teacher })}>
                                            <Text> Edit </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.productActionDelButton} onPress={() => deleteTeacher(teacher.id)}>
                                            <Text> Delete </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {

    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: "row",
        width: W,
        height: 100,
        marginBottom: 30,
    },
    sButton: {
        height: 50,
        marginTop: 40,
        width: 100,
        backgroundColor: '#00D84A',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    lButton: {
        height: 50,
        marginTop: 40,
        width: 150,
        backgroundColor: '#D82E2F',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff"
    },
    productsHeading: {
        fontSize: 30,
        color: '#fff',
        marginVertical: 10,
        fontWeight: 'bold',
        backgroundColor: '#00D84A',
        width: W / 1.2,
        alignSelf: 'center',
        textAlign: 'center'
    },
    productContainer: {
        width: W / 1.2,
        backgroundColor: '#d8ebdd',
        height: 150,
        marginLeft: 30,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    productDetails: {
        flex: 3,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    productButtonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    productActionDelButton: {
        backgroundColor: '#D82E2F',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 5,
    },
    productActionEditButton: {
        backgroundColor: '#DDD101',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 5,
    },
    noData: {
        width: W,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default HomeScreen;
