import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { CheckBox } from "react-native-elements";

const Task = (props) => {

    const [isSelected, setSelection] = useState(false);

    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{props.Text}</Text>
            </View>
            <View style={styles.check}>
            <CheckBox checked={isSelected} onPress={() => setSelection(!isSelected)}/>
            </View>
        </View>
    )
}
const styles= StyleSheet.create({
    item:{
        backgroundColor: "#f2f2f2",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent: 'center'
    },
    square:{
        width: 10,
        height: 10,
        backgroundColor: '#0066ff',
        borderRadius: 5,
        marginRight: 10,
    },
    itemText:{
        maxWidth: '80%'
    },
    check :{
        position:'absolute',
        alignSelf: 'flex-end',
       alignItems:'center',
       justifyContent: 'center'
    }
});

export default Task;