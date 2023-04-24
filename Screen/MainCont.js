import React, {useState} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createNavigationContainer } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/FontAwesome';


import Style from '../Src/Style'

//Screen
import HomeScreen from "../Screen/HomeScreen"
import ToDoList from "../Screen/ToDoList"
import Evenement from "../Screen/Evenement"

const Tab = createBottomTabNavigator();

const HomeName = 'Calendrier';
const ToDoListName = 'Taches';
const Event = 'Evenement';
const BaseEvent = 'EventBD'

const Stack = createStackNavigator();


export const StackScreen = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Acceuil" component={HomeScreen}/>
            <Stack.Screen name = "Evenement" component={Evenement}/>
        </Stack.Navigator>
    )
}



export default function MainCont() { 
    return(
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
                    }
                    return <Icon name={IconName} size={size} color={color}/>
                }
             })}>
            <Tab.Screen name={HomeName} component={StackScreen} options={{headerShown: false}}/>
            <Tab.Screen name={ToDoListName} component={ToDoList}/>
            </Tab.Navigator>         
    )  
}