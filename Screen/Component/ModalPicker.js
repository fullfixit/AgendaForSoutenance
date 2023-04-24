import React, {useState} from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal} from "react-native";

const OPTION = ['Anniversaire', 'Réunion', 'Rendez-vous', 'Mariage', 'Famille', 'Autres', 'Amis', 'Professionnel', ]
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ModalPicker = (props) => {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option)

    }

    const option = OPTION.map((item, index) => {
        return(
            <TouchableOpacity
            style={styles.option}
            key ={index}
            onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>

            </TouchableOpacity>
        )
    })
    return(
        <TouchableOpacity 
        style={styles.container} 
        onLongPress={() => props.changeModalVisibility(false)}>

            <View style={[styles.Modal, {width: WIDTH - 10, height: HEIGHT/2} ]}>

                <ScrollView>
                    {option}
                </ScrollView>

            </View>

        </TouchableOpacity>
    )

}
const styles= StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    Modal:{
        backgroundColor: "#0066ff",
        borderRadius: 20
    },
    option:{
        alignItems: 'flex-start'
    },
    text:{
        margin: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }

})
export {ModalPicker}