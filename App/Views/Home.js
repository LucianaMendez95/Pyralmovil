import React from "react"
import {ImageBackground, StyleSheet, TouchableOpacity,Text, View} from "react-native"
import styled from 'styled-components'
import {ScrollView} from "react-native-gesture-handler"

export default function Home({navigation}){
    const imageOne = require('../Assets/Newin_man.jpg')
    const imageTwo = require('../Assets/Newin_man2.jpg')
    return(<>
        <ScrollView>
            <ImageBackground source={require('../Assets/shopNow.jpg')} style={{width:'100%',height:450,justifyContent:'center'}}>
                <Text style={{color:'white',alignSelf:'center',fontSize:75, fontWeight:'bold'}}>NEW IN</Text>
                <TouchableOpacity style={{borderColor:'white', borderWidth:3,width:'35%',alignSelf:'center'}}>
                    <Text style={{color:'white',alignSelf:'center',fontSize:35}}>VIEW</Text>
                </TouchableOpacity>
            </ImageBackground>    
            <View style={styles.viewimagen}>
                <ImageBackground source={imageOne} style={styles.imagen}/>
                <ImageBackground source={imageTwo} style={styles.imagen}/>
            </View>
        </ScrollView>
    </>)
}

const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}%`};
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;


const styles = StyleSheet.create({
    viewimagen:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
        },
    imagen:{
        height: 350,
        width:190,
        marginLeft:5,
        marginRight:5,
        marginTop:40, 
    },
    button:{
        textAlign:"center",
        marginTop:60,
        borderColor:"black",
        borderWidth:2,
        marginRight:140,
        marginLeft:140,
        paddingTop:10,
        paddingBottom:10,
        fontWeight:"bold",
        fontSize:25
    }
})
