import React, { useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Platform, Modal} from "react-native";
import { CalendarList } from "react-native-calendars";



export default function CalendrierList () {
    return(
        <View style={{ flex: 1 }}>
            <CalendarList
            showScrollIndicator={true}
            /> 
        </View>
    )
}