import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Adress from './Adress';


export default function Checkout(props) {
    const [paises, setpaises] = React.useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch('https://restcountries.eu/rest/v2/all')
        const countries = await data.json()
        setpaises(countries)
    }

 
    return (
        <View style={styles.ropaDelCarrito}>
          <ScrollView alignSelf='center' style={{marginTop:5}}>
          <Text style={styles.titulo}>Purchase Summary</Text>
            {props.listProduct.map((prod,index) => {
                return(
                    <View style={styles.titleyprice} key={index}>
                        <Text style={styles.prodtitle}>{prod.title}</Text>
                        <Text style={styles.price}>{prod.price}</Text>
                    </View>)
            })}


            <View style={styles.totalprice}>
                 <Text style={styles.total}>Total</Text>
                 <Text style={styles.total}>${props.preciototal}</Text>
            </View>

          <Adress paises={paises}/>

            
          </ScrollView >

     </View>
    );
}

const styles = StyleSheet.create({
   
    ropaDelCarrito:{
        backgroundColor:'#F3F7F8',
        height: 500,
        width: 300,
        borderRadius:15,

   },
   titulo:{
       fontWeight: "bold",
       marginBottom: 30,
       width: 300,

   },
   titleyprice:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-between",
       marginLeft:15,
       marginRight:15
   },
   totalprice:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginLeft:15,
    marginRight:15,
    marginTop:15,
   },
   total:{
       fontWeight:"bold"
   }
  
})

const ButtonPers = styled.TouchableOpacity`
    width: 200px;
    height:  40px;
    alignSelf: center;
    borderRadius: 10px;
    flexDirection:row;
    backgroundColor: ${props => props.color};
    justifyContent:center;
    marginTop: ${props => `${props.tam}px`};   
`;
