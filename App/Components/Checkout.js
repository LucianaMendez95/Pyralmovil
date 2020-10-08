import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Adress from './Adress';
import {LOCAL_HOST, IMAGE} from '../Constants/index'
import { Icon } from 'react-native-elements'

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
                var url = prod.photo.replace(LOCAL_HOST,IMAGE)
                return(    
                    <View style={styles.titleyprice} key={index}>
                        <ImageShop source={{uri:url}} width={70} height={70} margin={0} />
                        <View>
                            <Text style={styles.prodtitle}>{`${prod.title} (${prod.quantity})`}</Text>    
                            <Text style={styles.prodtitle}>{`Size ${prod.size}`}</Text>
                        </View>
                        <Text style={styles.price}>{`$${prod.price}`}</Text>
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

const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}px`};
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;


const styles = StyleSheet.create({
   
    ropaDelCarrito:{
        backgroundColor:'white',
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
