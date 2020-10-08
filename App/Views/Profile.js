import {StyleSheet, Text, View, Button, TextInput} from "react-native"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {API} from '../Constants/index'
import axios from 'axios'
import Adress from "../Components/Adress";




export default function Profile(props){
    const [paises, setpaises] = React.useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch('https://restcountries.eu/rest/v2/all')
        const countries = await data.json()
        setpaises(countries)
    }


    const [pass, setPass] = React.useState("")
    const [mail, setMail] = React.useState("a@hotmail.com")

    const sendInfo = async() => {
       await axios.put(`${API}/changePassword`, { mail, pass })
       alert("Your password was changed")
    }

    const [profile, setprofile] = useState(true)
  
    const changeView = (truefalse) =>{
        setprofile (truefalse)
    }

    


    return(
    <View style={styles.Todo}>
         <Text style={styles.Titulo}>My Account</Text>
        <View>
            <View style={styles.Profileadress}>
                <View  style={[styles.Profile, profile ? { borderBottomColor:"black",borderBottomWidth:1} : {borderBottom: "none"}]}><Text onPress={() => changeView(true)} style={profile && {fontWeight:"bold"}} >Profile</Text></View>
                <View style={[styles.Adress, !profile ? { borderBottomColor:"black",borderBottomWidth:1} : {borderBottom: "none"}]}><Text onPress={() => changeView(false)} style={!profile && {fontWeight:"bold"}} >Address</Text></View>
            </View>
        {profile
           ? <View style={styles.infoycambiarcontraseña}>
                <Text style={styles.infotitulo}>Your info</Text>
       
                    <View style={styles.nombreymail}>
                        <View>
                            <Text style={styles.nombre}>Name and last name</Text>
                            <Text style={styles.mail}>Mail</Text>
                        </View>
                        <ButtonPers style={[styles.Logout, {alignSelf:'center', width: 70, height:30, marginLeft:70, marginTop:10}]} tam={50} color={'#DBEBF0'}><Text style={{alignSelf:"center"}}>Logout</Text></ButtonPers>
                    </View>

                    <View style={styles.todoolvidarcontraseña} >
                        <Text style={styles.infotitulo}>Forgot your password?</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Write your new password here"
                            placeholderTextColor="#ffffffa9"
                            onChangeText={(val)=> setPass(val)}
                        />
                        <ButtonPers tam={50} color={'#DBEBF0'} style={{alignSelf:'left', marginTop:10, width:150}}>
                           <Text style={{alignSelf:'center'}} onPress={() => sendInfo} >Change Password</Text>
                        </ButtonPers>                  
                   </View>
              
            </View>

        : <Adress paises={paises}/>}

        </View>
    </View>
    )
} 


const styles = StyleSheet.create({
    Todo:{
        marginTop: 70,
        marginLeft:20,
        marginRight:20,
    },
    Titulo:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:15,
        textAlign:"center",
    },
    Profileadress:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop: 5,
        marginBottom:5
    },
    Profile:{
        paddingRight:4,
        borderRightColor:"black",
        borderRightWidth:1,
    },
    Adress:{
        paddingLeft:4,
    },
    infotitulo:{
        fontWeight:"bold",
        marginTop:30,
        marginBottom:20
    },

    nombreymail:{
        marginLeft: 10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
    },
    nombre:{
        marginBottom:10
    },
    Logout:{

    },
    todoolvidarcontraseña:{
        marginTop: 60
    },


   TextInput:{
    width:  290,
    height: 40,
    paddingLeft:10,
    borderRadius: 7,
    marginTop:  10,
    backgroundColor: "#999999",
   },
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