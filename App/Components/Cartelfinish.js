import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Adress from './Adress';
import { AntDesign } from '@expo/vector-icons'; 


export default function Cartelfinish() {

 
    return (
        <View style={styles.ropaDelCarrito}>
           <AntDesign name="like1" size={60} color="black" style={{marginBottom:50}} />
            <Text style={styles.title}>Thank you for your purchase!</Text>
            <Text style={styles.info}>You will recieve an email with all the information</Text>
            <Text style={styles.info}>Please comunicate if something went wrong or if you need help</Text>
     </View>
    );
}

const styles = StyleSheet.create({
   
    ropaDelCarrito:{
        backgroundColor:'white',
        height: 350,
        width: 300,
        borderRadius:15,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        paddingRight:20,
        paddingLeft:20
   },
   title:{
       fontWeight:"bold",
       marginBottom:20
   },
   info:{
       textAlign:"center",
       marginBottom:20
   }
})
