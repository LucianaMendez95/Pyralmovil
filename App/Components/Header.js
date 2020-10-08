import React from 'react'
import styled from "styled-components"
import { StatusBar, StyleSheet, Text } from "react-native";
import {Icon} from 'react-native-elements';

export default function Header(props) {
    console.log(props)
    return (
        <Container>
            <Icon containerStyle={{alignSelf:'center'}}  name={'bars'} onPress={() => props.navigation.openDrawer()} type='font-awesome' size={30} color="#111111"/>
            <Text style ={{fontSize:30 ,alignSelf:'center',fontWeight:'bold'}}>{props.title}</Text>    
        </Container>
    );
}
const Container = styled.View`
    flexDirection: row;
    borderRadius: 0px;
    justifyContent: space-between;
    width : 63%;
`; 


