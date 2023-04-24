import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Platform, Modal} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import  {ModalPicker}  from "./Component/ModalPicker";
import { openDatabase } from "react-native-sqlite-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


var db = openDatabase({ name: 'SchoolDatabase.db' });

export default function Evenement ({navigation}){


    const [event, setEvent] = useState('');
    const [loc, setLoc] = useState('');
    const [Choose, setChoose] = useState("Type de l'évenement");
    const [text, setText] = useState('Heure Début');
    const [text1, setText1] = useState('Heure de fin');
    


    // useEffect(() => {
    //     db.transaction(function (txn) {
    //       txn.executeSql(
    //         "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
    //         [],
    //         function (tx, res) {
    //           console.log('item:', res.rows.length);
    //           if (res.rows.length == 0) {
    //             txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
    //             txn.executeSql(
    //               'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, event VARCHAR(30), location VARCHAR(30), TypeEvent VARCHAR(30), Début VARCHAR(30), fin VARCHAR(30), Date Date(yyyy-mm-dd))',
    //               []
    //             );
    //           }
    //         }
    //       );
    //     })
     
    //   }, []);
     
    //   const insertData = () => {
     
    //     if (event == '' || loc == '') {
    //       Alert.alert('Alert','Please Enter All the Values');
    //     } else {
     
    //       db.transaction(function (tx) {
    //         tx.executeSql(
    //           'INSERT INTO Student_Table (event, location, TypeEvent, Début, fin, Date) VALUES (?,?,?,?,?,?)',
    //           [event, location],
    //           (tx, results) => {
    //             console.log('Results', results.rowsAffected);
    //             if (results.rowsAffected > 0) {
    //               Alert.alert('Data Inserted Successfully....');
    //             } else Alert.alert('Failed....');
    //           }
    //         );
    //       });
     
    //     }
    //   }
    


    
    const [isModalVisible, setIsModalVisible] = useState(false)

    const changeModalVisibility = (Bool) => {
        setIsModalVisible(Bool)
    }
    
    const setData = (option) => {
        setChoose(option)
    }




    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date());

    const [Show, setShow] = useState(false);
    const [Show1, setShow1] = useState(false);

    const [mode, setMode] = useState('time');
    
   

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fTime = tempDate.getHours() + 'h' + tempDate.getMinutes() + 'min';
        setText(fTime)
 
    }

    const onChange1 = (event, selectedDate1) => {
        const currentDate1 = selectedDate1 || date1;
        setShow1(Platform.OS === 'ios')
        setDate1(currentDate1);

        let tempDate1 = new Date(currentDate1);
        let fTime1 = tempDate1.getHours() + 'h' + tempDate1.getMinutes() + 'min';
        setText1(fTime1)
    }



    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    } 

    const showMode1 = (currentMode1) => {
        setShow1(true);
        setMode(currentMode1);
    } 


    return(
        <View style={styles.item}>
            <View style={styles.write}>
                <TextInput style={styles.input} 
                placeholder="Nom de l'évenement" 
                onChangeText={
                    (text) => setEvent(text)
                }
                value={event} 
                />


                 <TextInput style={styles.input} 
                 placeholder="Lieu" 
                 onChangeText={
                    (text) => setLoc(text)
                }
                 value={loc} 
                 />

            </View>

            
            <View style={styles.type}> 
            <TouchableOpacity onPress={() => changeModalVisibility(true)}>
            <Text style={styles.Text} value={Choose}>{Choose}</Text>
            </TouchableOpacity>
            </View>
            

            <Modal
            transparent = {true}
            animationType = 'fade'
            visible = {isModalVisible}
            nRequestClose = {() => changeModalVisibility(false)}
            >

                <ModalPicker
                changeModalVisibility={changeModalVisibility}
                setData={setData}
                />

            </Modal>


            <View style={styles.Heure}>
                <Text style={{fontSize: 15, fontWeight:'bold'}}> Heure de l'évenement </Text>
                <View style={styles.Heuredescritpion}>
                <Text> Début </Text>


                    <TouchableOpacity onPress={() => showMode('time')}>
                    <View style={styles.addWarpper}>
                        <Text style={styles.addHeure} value={text}>{text}</Text>           
                    </View>
                    </TouchableOpacity>

                {Show && (
                <DateTimePicker
                testID ='DateTimePicker'
                value={date}
                mode ={mode}
                is24Hours ={true}
                display = 'default'
                onChange ={onChange}
                />)}
                </View>

                <View style={styles.Heuredescritpion}>
                <Text> Fin </Text>
                <TouchableOpacity onPress={() => showMode1('time')}>
                    <View style={styles.addWarpper}>
                        <Text style={styles.addHeure} value={text1}>{text1}</Text>
                    </View>
                </TouchableOpacity>

                {Show1 && (
                <DateTimePicker
                testID ='TimePicker'
                value={date1}
                mode ={mode}
                is24Hours ={true}
                display = 'default'
                onChange ={onChange1}
                />)}

                </View>
            <TouchableOpacity onPress={insertData}>
            <View style={styles.button}>  
                <Text style={styles.buttonConfirmé} > Confirmé </Text>         
            </View>
            </TouchableOpacity> 

            </View>
        <StatusBar style ='auto'/>
        </View>
        
    )
}

const styles= StyleSheet.create({
    item:{
        flex: 1
    },
    write:{
        paddingHorizontal: 5,
        bottom: 10,
        paddingTop: 10,
    },
    input:{
        paddingVertical: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
    },
    type:{
        paddingTop: 10,
        marginHorizontal: 5,
        borderRadius:60,
        backgroundColor: "#0066ff",
        color: '#fff',
        fontSize: 14,
        borderColor: '#fff',
        borderWidth: 1,
        height: 45,
        width: 200,
        textAlign: 'center',
        marginTop: 10
    },
    Text:{
        color: '#fff',
        textAlign: 'center',
    },
    Heure:{
        paddingTop: 20,
        paddingHorizontal: 5
    },
    Heuredescritpion:{
        marginTop: 10,
        paddingTop: 20,
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    addWarpper:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius:60,
        borderColor: '#262626',
        borderWidth: 1,
        height: 35,
        width: 175,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#262626'
    },
    button:{
        paddingHorizontal: 20,
        width: '100%',
        alignItems:'center',
        position: 'absolute',
        lexDirection:'row'
    },
    buttonConfirmé:{
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius:60,
        bottom: -60,
        backgroundColor: "#0066ff",
        color: '#fff',
        fontSize: 14,
        borderColor: '#fff',
        borderWidth: 1,
        height: 45,
        width: 250,
        justifyContent: 'center',
        textAlign: 'center'
        
    },
    addHeure:{
        fontSize: 12,
        fontWeight: 'bold'
    }
})
