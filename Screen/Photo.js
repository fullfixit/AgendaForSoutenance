import React, { Component, useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Platform, Modal, FlatList, Dimensions, ActionSheetIOS, Image} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';


const width = Dimensions.get('window').width;

export default class Photo extends Component{
    constructor (props) {
        super(props);
        this.state = {
            fileList : []
        }
    }



    onSelectedImage = (image) => {
        let newDaImg = this.state.fileList;
        const source = {uri: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        };
        newDaImg.push(item);
        this.setState({fileList: newDaImg})
    }

    takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.onSelectedImage(image);
            console.log(image);
          });
    }

    ChosePhotoFromGallery = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            this.onSelectedImage(image);
            console.log(image);
          });

    }
    renderItem = ({item, index}) => {
        return(
            <View>
                <Image source={item.url} style={styles.itemImage}/>
            </View>
        )
    };

    render(){
        let {content} = styles;
        let {fileList} = this.state;
        return(
            <View style={styles.content}>
                <FlatList 
                data={fileList}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.State}
                />

        <View style={styles.addbutton}>
            <TouchableOpacity onPress={this.ChosePhotoFromGallery}>
            <View style={styles.addWarpper}>
            <Icon name="photo" size={28} color="#ffff" />
            </View>
            </TouchableOpacity>
            </View>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    content:{
        flex: 1, 
        alignItems:'center', 
        marginTop: 40
    },
    itemImage:{
        height: 200,
        width: width -60,
        resizeMode: 'contain'
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
})