import React, { useState } from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform, TextInput, Keyboard} from "react-native"
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import Task from "./Component/Task";


export default function ToDoList({}){
    const [task, setTask] = useState();
    const [taskItem, setTaskItem] = useState([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItem([...taskItem, task]);
        setTask(null);
    }

    const completeTask = (index) =>{
        let itemCopy = [...taskItem];
        itemCopy.splice(index, 1);
        setTaskItem(itemCopy);
    }
        return(
            <View style={styles.container}>  
                <View style={styles.add}>
                <TouchableOpacity>
                    <Text style={{fontSize: 20, color:'white'}}>Taches d'aujourd'hui</Text>
                </TouchableOpacity>
                </View >
                <View style={styles.TaskWrap}>
                    <View style={styles.item}>
                        {/* Task manager */}
                        {
                            taskItem.map((item, index) =>{
                                return (
                                <TouchableOpacity onLongPress={() => completeTask(index)}>
                                    <Task key={index} Text={item}/>
                                </TouchableOpacity>
                                )
                            })
                        }
                    </View>    
                </View>

                {/* Ajout text*/}
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios"? "padding" : "height"}
                style={styles.writeTask}>
                    <TextInput style={styles.Input} placeholder={'Ajouter une tache'} onChangeText={Text => setTask(Text)}/>
                    <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWarpper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>     
            
        )
 }
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    add:{
        alignItems:"center",   
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#0066ff",
        borderColor:'white',
        borderRadius:20,
        height: 40,
        marginTop: 20,
        marginHorizontal: 25
        },
    TaskWrap:{
        paddingTop:20,
        paddingHorizontal:20
    },
    writeTask:{
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    Input:{
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius:60,
        backgroundColor: '#f2f2f2',
        borderColor: '#262626',
        borderWidth: 1,
        height: 45,
        width: 250,
    },
        addWarpper:{
        height: 50,
        width: 50,
        backgroundColor: "#0066ff",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#262626',
        borderColor :'#ffff',
    },
    addText:{
        color: '#fff',
        fontSize: 20,
        
    }
})