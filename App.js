import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import Tab from './App/Nagivator/TabV'
import Carrito from './App/Components/Carrito'
import {getValue, seveKeyValue} from './App/Constants/FuncAsyncStorage'


const cartAndListProducts = () => {
    
    getValue('cart',true) 
    .then(value => {
        seveKeyValue('cart',[],true)
    })
} 

export default function App() {
    useEffect(()=>{
        cartAndListProducts()
    },[])
    return (<>
        <Tab/>  
        <Carrito/>
    </>);
}

