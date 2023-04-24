import React, { useState, useEffect } from 'react';

import  {ModalPicker}  from "./Screen/Component/ModalPicker";

import DateTimePicker from "@react-native-community/datetimepicker";
 
import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList, Modal} from 'react-native';
 
import { openDatabase } from 'react-native-sqlite-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from '@react-navigation/native';
 
import { createStackNavigator } from '@react-navigation/stack';
 


var db = openDatabase({ name: 'DBevenement.db' });
 
  
  import ToDoList from './Screen/ToDoList';
  import CalendrierList from './Screen/CalendrierList';
  import Photo from './Screen/Photo';
  import Details from './Screen/Details';
  
  const Tab = createBottomTabNavigator();

  //Screen
  const HomeName = 'Acceuil';
  const ToDoListName = 'Taches';
  const Calendar = 'Calendrier';
  const Gallery = 'Photo Souvenir';
  const ViewDeta = 'Détails';



function HomeScreen({ navigation }) {





 
  const [S_Name, setName] = useState('');
  const [S_Phone, setPhone] = useState();
  const [S_Address, setAddress] = useState('');
  const [S_Date, setDateDb] = useState('');
  const [Début, setDébut] = useState('');
  const [Fin, setFin] = useState('');

  const [DaTe, Setdate] = useState('Choisissez un date');
  const [text, setText] = useState('Heure Début');
  const [text1, setText1] = useState('Heure de fin');

  //Autres screen

  const [Choose, setChoose] = useState("Type de l'évenement");

  const [isModalVisible, setIsModalVisible] = useState(false)

  const changeModalVisibility = (Bool) => {
      setIsModalVisible(Bool)
  }
  
  const setData = (option) => {
      setChoose(option)
  }




  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

  const [Show, setShow] = useState(false);
  const [Show1, setShow1] = useState(false);
  const [Show2, setShow2] = useState(false);

  const [mode, setMode] = useState('time');
  
 

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios')
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() ;
      setText(fTime)

  }

  const onChange1 = (event, selectedDate1) => {
      const currentDate1 = selectedDate1 || date1;
      setShow1(Platform.OS === 'ios')
      setDate1(currentDate1);

      let tempDate1 = new Date(currentDate1);
      let fTime1 = tempDate1.getHours() + ':' + tempDate1.getMinutes();
      setText1(fTime1)
  }

  const onChange2 = (event, selectedDate2) => {
    const currentDate2 = selectedDate2 || date2;
    setShow2(Platform.OS === 'ios')
    setDate2(currentDate2);

    let tempDate2 = new Date(currentDate2);
    let fDate = tempDate2.getDate() + '~' + (tempDate2.getMonth()) + '~' + tempDate2.getFullYear();
    Setdate(fDate)

}


  const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
  } 

  const showMode1 = (currentMode1) => {
      setShow1(true);
      setMode(currentMode1);
  } 

  const showMode2 = (currentMode2) => {
    setShow2(true);
    setMode(currentMode2);
} 
 
  //fin

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Student_Table( student_name VARCHAR(30), student_phone VARCHAR(30), student_address VARCHAR(25), Début_heure VARCHAR(30), Fin_heure VARCHAR(30), Date_début VARCHAR(30))',
              []
            );
            
          }
        }
      );
    })
 
  }, []);
 
  const insertData = () => {
 
    if (S_Name == '' || S_Phone == '' ) {
      Alert.alert('SVP','Veuillez remplier les donner' );
    } else {
 
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO Student_Table (student_name, student_phone, student_address, Début_heure, Fin_heure,  Date_début) VALUES (?,?,?,?,?,?)',
          [S_Name, S_Phone, Choose, text, text1, DaTe],
          
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Donner insérer....');
            } else Alert.alert('Failed....');
          }
        );
      });
      JSON.stringify(date)
 
    }
  }
 
  navigateToViewScreen = () => {
    navigation.navigate('Liste des évenement');
  }
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
 
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setName(text)
          }
          placeholder="Entrer l'évenement"
          value={S_Name} />
 
        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setPhone(text)
          }
          placeholder="Enter Lieu de l'évenement"
          value={S_Phone} />

        <View  style={styles.type}> 
            <TouchableOpacity onPress={() => showMode2('date')}>
            <Text style={styles.Text}  value={S_Date}>{DaTe}</Text>
            </TouchableOpacity>
            {Show2 && (
                <DateTimePicker
                testID ='DatePicker'
                value={date2}
                mode ={mode}
                is24Hours ={true}
                display = 'default'
                onChange ={onChange2}
                />)}
          </View>
          
 
        <View style={styles.type}> 
            <TouchableOpacity onPress={() => changeModalVisibility(true)}>
            <Text style={styles.Text} value={S_Address}>{Choose}</Text>
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

           
                <Text style={{fontSize: 15, fontWeight:'bold'}}> Heure de l'évenement </Text>
                <View style={styles.Heuredescritpion}>
                <Text> Début </Text>


                    <TouchableOpacity onPress={() => showMode('time')}>
                    <View style={styles.addWarpp}>
                        <Text style={styles.addHeure} value={Début}>{text}</Text>           
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
                    <View style={styles.addWarpp}>
                        <Text style={styles.addHeure} value={Fin}>{text1}</Text>
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
                
        <View style={styles.Touchable}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={insertData}>
 
          <Text style={styles.touchableOpacityText}> Ajout </Text>
 
        </TouchableOpacity>
 
        <TouchableOpacity
          style={[styles.touchableOpacity, { backgroundColor: '#33691E' }]}
          onPress={navigateToViewScreen}>
 
          <Text style={styles.touchableOpacityText}> List</Text>
 
        </TouchableOpacity>
        </View>
      
      
 
       
      </View>
    </SafeAreaView>
  )
};
 
export function ViewAllStudentScreen({ navigation }) {
 
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);
 
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Student_Table',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
 
          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true)
          }
 
        }
      );
 
    });
  }, []);
 
  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
        }}
      />
    );
  };
 
  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
 
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          Pas d'évenement...
          </Text>
 
      </View>
    );
  }
 
      
  const pressHandler = () => {
    navigation.navigate('Ajoute évenement');
  }

  
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {empty ? emptyMSG(empty) :
 
          <FlatList
            data={items}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Détails évenement', {DateD:item.Date_début,  HeureD:item.Début_heure,  Heure:item.Fin_heure,  Event:item.student_name,  lieu:item.student_phone, type:item.student_address})}>
              <View style={styles.itemStl}>
                <Text style={styles.itemsStyleDate}> {item.Date_début} </Text>

                <View style={styles.itemStln}>
                <Text style={styles.itemsStyleHeure}> {item.Début_heure} </Text>

                <View style={styles.itemStlnr}>
                <Text style={styles.itemsStyle}> {item.student_name} </Text>
                <Text style={styles.itemsStyle}> {item.student_phone} </Text>             
                
                </View>

                </View>

              </View>
              </TouchableOpacity>
            }
          />
        }
      </View>
      <View style={styles.addbutton}>
                      <TouchableOpacity onPress={pressHandler}>
                          <View style={styles.addWarpper}>
                              <Text style={styles.addText} >+</Text>
                          </View>
                      </TouchableOpacity>
                </View>
    </SafeAreaView>
 
  );
}


const Stack = createStackNavigator(); 

export const StackScreen = () =>{
  return(
    <Stack.Navigator>
 
    <Stack.Screen name="Ajoute évenement" component={HomeScreen} />
    <Stack.Screen name="Liste des évenement" component={ViewAllStudentScreen}/>
    <Stack.Screen name="Détails évenement" component={Details}/>

  </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
       <Tab.Navigator
            initialRouteName={HomeName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let IconName;
                    let rn = route.name;

                    if (rn === HomeName){
                        IconName = focused ? 'home' : 'home';
                    }else if(rn === ToDoListName){
                        IconName = focused ? 'list' : 'list';
                    }else if(rn === Calendar){
                      IconName = focused ? 'calendar' : 'calendar';
                    }else if(rn === Gallery){
                      IconName = focused ? 'camera' : 'camera';
                    }
                    return <Icon name={IconName} size={size} color={color}/>
                }
             })}>
            <Tab.Screen name={Gallery} component={Photo}/>
            <Tab.Screen name={HomeName} component={StackScreen} options={{headerShown: false}}/>
            <Tab.Screen name={ToDoListName} component={ToDoList}/>
            <Tab.Screen name={Calendar} component={CalendrierList}/>
            </Tab.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
 
  touchableOpacity: {
    backgroundColor: '#0091EA',
    alignItems: 'center',
    borderRadius: 8,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    

  },
  Touchable:{
    flexDirection : 'row',
    bottom: -18,
    position: 'absolute'
  }, 
  touchableOpacityText: {
    color: '#FFFFFF',
    fontSize: 23,
    padding: 5
  },
 
  textInputStyle: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: '#00B8D4',
    borderRadius: 7,
    marginTop: 15,
  },
 
  itemsStyle: {
    fontSize: 15,
    color: '#000',
    fontStyle: 'italic',
  },
  type:{
    paddingTop: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#0066ff",
    color: '#fff',
    fontSize: 14,
    borderColor: '#fff',
    borderWidth: 1,
    height: 45,
    width: 200,
    textAlign: 'center',
    marginTop: 10,
},
Text:{
  color: '#fff',
  textAlign: 'center',
},
addHeure:{
  fontSize: 12,
  fontWeight: 'bold'
},
Heure:{
  paddingTop: 20,
  paddingHorizontal: 10
},
Heuredescritpion:{
  marginTop: 20,
  paddingTop: 10,
  width: '100%',
  flexDirection:'row',
  justifyContent: 'space-between',
  alignItems:'center',
},
addWarpp:{
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius:10,
  borderColor: '#262626',
  borderWidth: 1,
  height: 35,
  width: 175,
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#262626'
},
itemStl:{
  height: 90,
  width: '100%',
  borderWidth: 1,
  borderColor: '#0066ff',
  borderRadius: 10,
  marginTop: 5,
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
itemStln:{
  flexDirection: 'row',
},
itemStlnr:{
  margin: 10,
  marginVertical: 10,
  paddingRight: 40
},
itemsStyleDate: {
  fontSize: 15,
  color: '#000',
  paddingLeft : 5
},
itemsStyleHeure: {
  fontSize: 50,
  fontWeight: 'bold',
  paddingRight: 5,
  paddingLeft: 5
}
});