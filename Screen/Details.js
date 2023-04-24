import { useRoute } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Platform, Modal} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

  export default function Details ({ navigation,route}) {


        return(
            <View style={styles.container}>
    
            <View style={styles.DateItem}>
           
            <Text style={styles.Date} >{route.params.DateD}</Text>
            <Text style={styles.Time}>  {route.params.HeureD} - {route.params.Heure}</Text>
            </View >
            <View style={styles.Te}>
            <Text style={styles.Text}><Icon2 name="category" size={25} color="#000" />   {route.params.type}</Text>
            <Text style={styles.Text}><Icon2 name="event" size={25} color="#000" />   {route.params.Event}</Text>
            <Text style={styles.Text}> <Icon name="map-marker" size={25} color="#000" />    {route.params.lieu}</Text>
            </View>
            </View>

        )
    
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20,
        marginTop:10,
    },
    Text:{
        fontSize: 20,
        color: '#000',
        marginVertical: 10,
        marginLeft: 20
    },
    DateItem:{
        marginVertical: 30
    },
    Date:{
        marginVertical: 10,
        fontSize: 25,
        fontWeight: 'bold',
    },
    Time:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 45
    },
    Te:{
        borderWidth: 1,
        width: '100%',
    }
})

