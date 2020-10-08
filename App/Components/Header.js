import React from 'react'
import styled from "styled-components"
import Carrito from '../Components/Carrito'
import { StatusBar, StyleSheet } from "react-native";
import {Icon} from 'react-native-elements';

export default function Header(props) {
    return (
        <Container style={{backgroundColor:'red'}}>
            <Icon name={bars} type='font-awesome' size={30} color="#111111"/> 
            <Text>PYRAL</Text>
            <Carrito/>        
            <StatusBar hidden={true} />
        </Container>
    );
}
const Container = styled.View`
    flexDirection: row;
    borderRadius: 5px;
    justifyContent: space-between;
    width : 100%;
`; 


