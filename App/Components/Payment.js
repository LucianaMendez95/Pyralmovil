import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';
import Adress from './Adress';
import {Picker} from '@react-native-community/picker';
import CreditCardDisplay from "react-native-credit-card-display";


export default function Payment(props) {
    const [paymentType, setpaymentType] = React.useState()

    const [card, setCard] = useState({
        expiry: "1222",
        cvc: 123,
        type: 'visa',
        number: 4134123412341234,
        name: "Tester Tee",
        flip: false,
    })

    const inputHandler = (value, field) => {
        setCard({
            ...card,
            [field]: value
        })
    }

    return (
        <View style={styles.ropaDelCarrito}>
        <ScrollView alignSelf='center' style={{marginTop:5}}>
          <View style={styles.totalprice}>
                 <Text style={styles.total}>Total</Text>
                 <Text style={styles.total}>${props.preciototal}</Text>
            </View>

             <Picker
                    selectedValue={paymentType}
                    style={{height: 50, width: 100, alignSelf:'center', marginBottom:20}}
                    onValueChange={(itemValue) => setpaymentType(itemValue)
                }>
                        <Picker.Item key={1} label="Cash" value="Cash"/>
                        <Picker.Item key={2} label="Card" value="Card"/>
             </Picker>   

         {paymentType === "Card"
         ? <View style={styles.card}>
                <CreditCardDisplay
                        number={card.number}
                        cvc={card.cvc}
                        expiration={card.expiry}
                        name={card.name}
                        since="   "
                        fontSize={20}
                        flipped={card.flip}
                        frontStyles={{color: "#fff"}}
                        cardStyles={{color: "#fff"}}
                    />
                  <View style={styles.todoslosinputs}> 
                   <TextInput 
                    style={styles.TextInput}
                    placeholder="Numero. 16 digitos"
                    placeholderTextColor="white"
                    onFocus={() => inputHandler(false, 'flip')} 
                    onChangeText={(val) => inputHandler(parseInt(val), 'number')} />

                  <TextInput 
                    style={styles.TextInput}
                    placeholder="Nombre. Ej: Juan Perez"
                    placeholderTextColor="white"
                    onFocus={() => inputHandler(false, 'flip')} 
                    onChangeText={(val) => inputHandler(val, 'name')} />

                  <TextInput 
                    style={styles.TextInput}
                    placeholder="Fecha de expiracion. MM/AA"
                    placeholderTextColor="white"
                    onFocus={() => inputHandler(false, 'flip')}
                    onChangeText={(val) => inputHandler(val, 'expiry')} />

                  <TextInput 
                    style={styles.TextInput}
                    placeholder="Codigo de seguridad"
                    placeholderTextColor="white" 
                    onFocus={() => inputHandler(true, 'flip')}
                    onChangeText={(val) => inputHandler(val, 'cvc')} />
                </View> 
          </View>
        :<></>}
          
        </ScrollView >

   </View>
    )
}


const styles = StyleSheet.create({
   
    ropaDelCarrito:{
        backgroundColor:'white',
        height: 500,
        width: 300,
        borderRadius:15,
   },
   card:{
       marginTop:110
   },
   todoslosinputs:{
       marginTop:20,
       marginBottom:20,
       display:"flex",
       justifyContent:"center",
       alignItems:"center"
   },
   TextInput:{
    width:  290,
    height: 40,
    paddingLeft:10,
    borderRadius: 7,
    marginTop:  10,
    backgroundColor: "#999999",
   },
   totalprice:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    marginLeft:15,
    marginRight:15,
    marginTop:30,
   },
   total:{
       fontWeight:"bold",
       marginRight:20,
       marginLeft:20
   }
})
