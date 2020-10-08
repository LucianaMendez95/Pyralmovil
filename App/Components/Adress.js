import {StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity} from "react-native"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {API} from '../Constants/index'
import axios from 'axios'
import {Picker} from '@react-native-community/picker';


export default function Adress(props){

      const [country, setcountry] = React.useState('java')
      const [city, setcity] = React.useState("")
      const [address, setadress] = React.useState("")
      const [postalCode, setpostalCode] = React.useState("")
      const [phoneNumber, setphoneNumber] = React.useState("")
      const [token, settoken] = React.useState("22")

      const [mensajes, setMensajes] = useState({
            country: false,
            city1: false,
            city2: false,
            address1: false,
            address2: false,
            postalCode: false,
            phoneNumber: false,
    })

    console.log(mensajes)
     const sendContact = async () => {
        mensajes.country = false
        mensajes.city = false
        mensajes.address = false
        mensajes.postalCode = false
        mensajes.phoneNumber = false


        if (country === '' || city === '' || address === '' || postalCode === '' || phoneNumber === '') {
            alert("please complete all fields")
            

        } else if (country.length > 15) {
            setMensajes({
                ...mensajes,
                country: true
            })

        }  else if (city.length > 15) {
            setMensajes({
                ...mensajes,
                city: true
            })              
       }  else if (address.length > 25) {
        setMensajes({
            ...mensajes,
            address: true
        })             
       }  else if (postalCode.length > 5) {
        setMensajes({
            ...mensajes,
            postalCode: true
        })   

        }  else if (phoneNumber.length > 10) {
            setMensajes({
                ...mensajes,
                phoneNumber: true
            })  
        }else{
        await axios.post(`${API}/user/direction`, { country, city, address, postalCode, phoneNumber, token })
        // await this.props.getContact(this.props.userlogged.token)
        alert("Your information was sent")
        }
     }

     const [changeadress, setchangeadress] = useState(false);

     const checkout =()=>{
        setchangeadress(!changeadress);
     }


    return(
            <ScrollView style={styles.Todo}>
                <View>
                    <Text style={styles.Titulo}>Contact information</Text>
                    <View style={styles.direccion}>
                        <Text>Country:</Text>
                        <Text>City:</Text>
                        <Text>Address:</Text>
                        <Text>Postal code:</Text>
                        <Text>Phone number:</Text>
                    </View>               
                </View>
                <ButtonPers onPress={checkout} 
                    style={[styles.Logout, {alignSelf:'center', width: 180, height:30, 
                    marginTop:30}]} tam={50} color={'black'}><Text style={{alignSelf:"center",color:'white'}}>
                        Add or chance adress</Text>
                </ButtonPers>
           {changeadress
           
               ? <><View>
                    <View style={styles.inputsyselect}>
                        <View>  
                            <Picker
                                    selectedValue={country}
                                    style={{height: 20, width: 300}}
                                    onValueChange={(itemValue, itemIndex) =>  setcountry(itemValue) }>

                                    {props.paises.map(pais => <Picker.Item label={pais.name} value={pais.name}/>)}
                            </Picker>
                        </View> 

                        {mensajes.city ?  <Text style={{color:"red", marginTop:10, marginBottom:-8}}>*The City you entered in too long</Text> : <Text></Text>}
                        <View style={styles.inputs}>
                                <TextInput
                                style={styles.TextInput}
                                placeholder="Write your city here"
                                placeholderTextColor="#ffffffa9" 
                                onChangeText={(val) => setcity(val)}
                            />          

                          {mensajes.address ?  <Text style={{color:"red", marginTop:10, marginBottom:-8}}>*The address you entered in too long</Text> : <Text></Text>}
                                <TextInput
                                style={styles.TextInput}
                                placeholder="Write your address here"
                                placeholderTextColor="#ffffffa9" 
                                onChangeText={(val) => setadress(val)}
                            />               
                            
                        </View>
                        <View>

                        {mensajes.postalCode ? <Text style={{color:"red", marginTop:10, marginBottom:-8}}>*The postalCode you entered in too long</Text > : <Text></Text>}
                            <TextInput
                                    style={styles.TextInput}
                                    placeholder="Write your postalCode here"
                                    placeholderTextColor="#ffffffa9" 
                                    onChangeText={(val) => setpostalCode(val)}
                                />                 

                                {mensajes.phoneNumber ? <Text style={{color:"red", marginTop:10, marginBottom:-8}}>*The phone number you entered in too long</Text> : <Text></Text>}
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder="Write your phoneNumber here"
                                    placeholderTextColor="#ffffffa9" 
                                    onChangeText={(val) => setphoneNumber(val)}
                            />     
                        </View>
                    </View>
                 </View>
                 <TouchableOpacity style={styles.butButton} onPress={sendContact} style={[styles.Logout, {alignSelf:'center', width: 130, height:30, marginTop:30}]} tam={50} color={'white'}><Text style={{alignSelf:"center"}}>Send information</Text></TouchableOpacity>
            </>
             :<></>
                }
           
            </ScrollView>
    )
} 

const styles = StyleSheet.create({
    Todo:{
        marginTop:30,
        marginBottom:20,
        height:500,
    },

    Titulo:{
        fontWeight:"bold",
        marginBottom:20
    },
    direccion:{
        marginLeft: 10,
        marginBottom:30

    },
    inputs:{
        marginTop:200
    },
    inputsyselect:{
        display:"flex",
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
       butButton:{
        backgroundColor: "black",
        borderRadius:5,
        marginRight:40,
        marginLeft:40,
        marginBottom:5,
        paddingTop:4,
        height:45,
        paddingBottom:4,
        marginTop: 5,
        justifyContent:'center',
   },
})

const ButtonPers = styled.TouchableOpacity`
    width: 200px;
    height:  40px;
    alignSelf: center;
    borderRadius: 3px;
    flexDirection:row;
    backgroundColor: ${props => props.color};
    justifyContent:center;
    marginTop: ${props => `${props.tam}px`};   
`;
