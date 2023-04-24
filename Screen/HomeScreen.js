import { types } from "@babel/core";
import React, {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, Text,  Image, StyleSheet, Button, TouchableOpacity} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { openDatabase } from "react-native-sqlite-storage";


var db = openDatabase({ name: 'SchoolDatabase.db' });

export default function HomeScreen ({navigation}) {

  
  const [event, setEvent] = useState("");
  const [loc, setLoc] = useState("");
  const [Choose, setChoose] = useState("Type de l'évenement");
  const [text, setText] = useState('Heure Début');
  const [text1, setText1] = useState('Heure de fin');


  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData')
      .then(value => {
        if (value != null){
          let user = JSON.parse(value);
          setEvent(user.evenement)
        }
      })
    } catch (error) {
      console.log(error);
    }
  } 


    // const [items, setItems] = useState([]);
    // const [empty, setEmpty] = useState([]);
   
    // useEffect(() => {
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       'SELECT * FROM Student_Table',
    //       [],
    //       (tx, results) => {
    //         var temp = [];
    //         for (let i = 0; i < results.rows.length; ++i)
    //           temp.push(results.rows.item(i));
    //         setItems(temp);
   
    //         if (results.rows.length >= 1) {
    //           setEmpty(false);
    //         } else {
    //           setEmpty(true)
    //         }
   
    //       }
    //     );
   
    //   });
    // }, []);
   
    // const listViewItemSeparator = () => {
    //   return (
    //     <View
    //       style={{
    //         height: 1,
    //         width: '100%',
    //         backgroundColor: '#000'
    //       }}
    //     />
    //   );
    // };

    // const emptyMSG = (status) => {
    //     return (
    //       <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
     
    //         <Text style={{ fontSize: 25, textAlign: 'center' }}>
    //           No Record Inserted Database is Empty...
    //           </Text>
     
    //       </View>
    //     );
    //   }


      






    // const [event, setEvent] = useState("");
    // const [loc, setLoc] = useState("");

    // useEffect( () => {
    //     getData();
    // }, []);
     
    // const getData = () => {
    //     try{
    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "SELECT * loc FROM Users",
    //                 [],
    //                 (tx, results) => {
    //                     var len = results.rows.length;
    //                     if(len > 0){
    //                         var userEvent = results.rows.item(0).event;
    //                         var userLoc = results.rows.item(0).loc;
    //                         setEvent(userEvent);
    //                         setLoc(userLoc);
    //                     }
    //                 }
    //             )
    //         })
    //     }catch (error) {
    //         console.log(error);
    //     }
    // } 
    
    const pressHandler = () => {
        navigation.navigate('Evenement');
    }




    return(
    <View style={styles.Container}>

      <Text>BONJOUR {event}</Text>
       
        {/* {empty ? emptyMSG(empty) :
 
          <FlatList
            data={items}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View key={item.student_id} style={{ padding: 20 }}>
 
                <Text style={styles.itemsStyle}> Id: {item.Evenement} </Text>
                <Text style={styles.itemsStyle}> Name: {item.Location} </Text>
                <Text style={styles.itemsStyle}> Phone Number: {item.Heure_début} </Text>
                <Text style={styles.itemsStyle}> Address: {item.Heure_fin} </Text>
                <Text style={styles.itemsStyle}> Address: {item.type} </Text>
                <Text style={styles.itemsStyle}> Address: {item.Date} </Text>
 
              </View>
            }
          />
        } */}




    {/*Add boutton*/}
    
    <View style={styles.addbutton}>
    <TouchableOpacity onPress={pressHandler}>
        <View style={styles.addWarpper}>
            <Text style={styles.addText} >+</Text>
        </View>
    </TouchableOpacity>
    </View>
    </View>

    )
}
const styles= StyleSheet.create({
Container:{
    flex: 1,
    backgroundColor: 'white'
},
itemContainer:{
    backgroundColor :'White',
    justifyContent :'center',
    alignItems :'center',

},
Agenda:{
    flex:1
},
addbutton:{
    flex: 0,
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 10,
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center'
},
addWarpper:{
    height: 50,
    width: 50,
    backgroundColor: "#0066ff",
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor :'#ffff',
},
addText:{
    color: '#fff',
    fontSize: 20
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

})
