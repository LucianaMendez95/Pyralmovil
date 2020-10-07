import React, { useState } from 'react';
import {View, Text, CheckBox, ImageBackground, Button, StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components'
import axios from 'axios'
import {API} from '../Constants/index'
import { seveKeyValue } from '../Constants/FuncAsyncStorage'


const  LogInt = ({ navigation, route}) => {
    const [logUser, setLogUser] = useState({mail: '',pass: ''})
    const image = {uri:'https:www.onlygfx.com/wp-content/uploads/2017/07/paint-texture-black-and-white-3.jpeg'}
    const sendInfo = async() => {
        const response = await axios.post(`${API}/user/login`, logUser)
        const {contact, firstName, lastName, mail, rating, rol, token} = response.data
        if (!response.data.success) {
            alert('Incorrect mail or password')
        } else {
            const user = {contact, firstName, lastName, mail, rating, rol, token}
            seveKeyValue('user',user,true)
            route.params.setRender(!route.params.render)
            alert('Welcome')
            navigation.navigate('Home')
        }
    }
    return(
        <View style = {{backgroundColor:'#2B3B40',flex:1}}>
            <ImageBackground style = {{justifyContent:'center',flex:0.98}} imageStyle = {{borderBottomLeftRadius:70,
                borderBottomRightRadius: 70}} source={image}>
                <ImageShop source={require('../Assets/botLogo.png')} width={100} height={100} margin={5} /> 
               <Text style={styles.welcome}>Log In</Text>
              
                <TextInput
                style={styles.TextInput}
				keyboardType= 'email-address'
				placeholder="Write your mail here"
				placeholderTextColor="#ffffffa9"
				onChangeText={(val) => setLogUser({...logUser,mail:val})}
			/>      

               <TextInput
                style={styles.TextInput}
				secureTextEntry = {true}
				placeholder="Write your password here"
                placeholderTextColor="#ffffffa9"
                onChangeText={(val)=> setLogUser({...logUser,pass:val})}
			/>
              
              
                <ContainerInfo>
                    <View style={{flexDirection:'row'}}>        
                        <CheckBox value={false}
                            style={{borderColor:'white', borderWidth:12}}
                        />
                        <Text style={{alignSelf:'center' , color: 'white' }}>Remember me</Text>
                    </View>
                    <Text style={{alignSelf:'center', color:'#41A6C4'}}>Forgot password</Text>
                </ContainerInfo>   
                    <ButtonPers tam={50} color={'#DBEBF0'} onPress={() => sendInfo()}>
                    <Text style={{alignSelf:'center'}} onPress={sendInfo}  >Log in </Text>
                </ButtonPers>    
                <ButtonPers tam={30} color={'#DBEBF0'}>
                    <Text style={{alignSelf:'center'}} >Log init google</Text>
                </ButtonPers>    
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    welcome:{
        alignSelf: 'center',
        fontSize: 30,
         marginTop: 15,
         color:"white",
    },
   TextInput:{
    borderColor: '#6A9DAC',
    borderWidth: 2,
    width:  290,
    height: 40,
    alignSelf: 'center',
    paddingLeft:10,
    borderRadius: 7,
    marginTop:  10,
    backgroundColor: "#8F8B97",
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

const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}px`};
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;

const LogIntInput = styled.TextInput`
    borderColor: #8F8B97;
    borderWidth: 2px;
    width:  290px;
    height: 40px;
    alignSelf: center;
    paddingLeft:10px;
    borderRadius: 7px;
    marginTop:  10px;
`;

const ContainerInfo = styled.View`
    marginTop: 10px;
    flexDirection: row;
    justifyContent: space-between;
    width: 290px;
    alignSelf:center;
`;

export default LogInt
