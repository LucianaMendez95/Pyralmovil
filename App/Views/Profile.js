import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from "react-native"
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {API} from '../Constants/index'
import axios from 'axios'
import Adress from "../Components/Adress";
import { getValue, removeKey } from '../Constants/FuncAsyncStorage'
import {Icon} from 'react-native-elements';






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
  
  


        const CerrarSeccion = (props) => {
            const log = () => {
                removeKey('user')
                props.setRender(!props.render)
            }
            
            return(
                <ButtonPers onPress={() => log()} tam={10} color={'#111111'} style={{marginBottom:20, marginTop:120, width:150,marginLeft:-110}}>
                <Text style={{alignSelf:'center',fontSize:15, color:'whitesmoke', fontWeight:'bold'}} > Logout</Text>
           </ButtonPers> 
            )
        }
        
        const CustomDrawerContent = (props) => {
            const [user, setUser] = useState({})
            const [render, setRender] = useState(true)
            useEffect(() => {
                getValue('user', true)        
                .then(userP => {
                    if(userP === null){
                        setUser(userP)}
                    else{
                        setUser({...userP})}
                })
            },[render])
            return(
                <View style={styles.nombreymail}>
                <View>
                    <Text style={styles.nombre}>{user.firstName}  {user.lastName}</Text>
                    <Text style={styles.mail}>{user.mail}</Text>
                </View>
                <CerrarSeccion render={render} setRender={setRender}/>
                 
            </View>
            )}
       

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
                   
                <CustomDrawerContent/>
               

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
        marginLeft: 20,
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
   TextInput:{
    borderColor: '#111111',
    borderWidth: 2,
    width:  290,
    height: 40,
    alignSelf: 'center',
    paddingLeft:10,
    borderRadius: 7,
    marginTop:  10,
    backgroundColor: "whitesmoke",
   },
})

const ButtonPers = styled.TouchableOpacity`
    width: 300px;
    height:  40px;
    alignSelf: center;
    borderRadius: 5px;
    flexDirection:row;
    backgroundColor: ${props => props.color};
    justifyContent:center;
    marginTop: ${props => `${props.tam}px`};   
`;