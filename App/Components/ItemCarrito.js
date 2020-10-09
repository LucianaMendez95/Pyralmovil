import React, {useEffect, useState} from 'react';
import { EvilIcons, Entypo} from '@expo/vector-icons'; 
import { View, Text, StyleSheet } from 'react-native';
import {LOCAL_HOST, IMAGE} from '../Constants/index'
import { MaterialIcons } from '@expo/vector-icons';
import {UpdateCart, removeTheCart} from '../Constants/funcionesCarrito'
import styled from 'styled-components'


const useForceUpdate = () => useState()[1];

const ItemCarrito = (props) => {
    
    const forceUpdate = useForceUpdate();
    const updateQuantityProduct = (quantity) => {
        UpdateCart(props.product, quantity)
        props.setUpdate(!props.update)
    }
    const removeProduct = (prod) => {
        removeTheCart(prod)
        props.setUpdate(!props.update)
    }

    const url = props.product.photo.replace(LOCAL_HOST,IMAGE)
    return (
            <View style={styles.unelEmentoCarrito}>
                <ImageShop source={{uri:`${url}`}} width={78} height={80} margin={0}/>
                <View style={{...styles.tituloCantidad,width:'40%'}}>
                    <Text style={styles.titulo}>{props.product.title}</Text> 
                    <Text style={{}}>{`Size ${props.product.size}`}</Text>
                    <View style={styles.cantidad}>
                        <MaterialIcons style={{alignSelf:'center',color:'gray'}} name="remove" 
                            size={20} color="black" onPress={() => {
                                updateQuantityProduct(-1)
                                forceUpdate
                            }}
                        />
                        <Text style={{fontSize:18,alignSelf:'center'}}>{props.product.quantity}</Text>
                        <Entypo name="plus" style={{alignSelf:'center', color:'gray' }} size={20} 
                            color="black" onPress={() => {
                                updateQuantityProduct(1)
                                forceUpdate
                            }} />
                    </View>
                </View>

                <View  style={styles.tachoyprecio}>
                    <EvilIcons name="trash" size={35} color="black" 
                        onPress={() => {
                            removeProduct(props.product)
                            forceUpdate
                        }}
                    />
                    <Text style={styles.precio}>${props.product.price}</Text>
                </View>
            </View>
    )
}
            
const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}px`};
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;


const styles = StyleSheet.create({
    unelEmentoCarrito:{
        width: 270,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        backgroundColor:"white",
        borderBottomColor: "whitesmoke",
        borderBottomWidth:1,
        paddingBottom:0,
        paddingTop:0,
        paddingRight:0,
        paddingLeft:0,

   },
   titulo:{
       fontWeight: "bold"
   },

   tituloCantidad:{
   },
   cantidad:{
       display:"flex",
       flexDirection: "row",
       marginTop: 18
   },
   numerocantidad:{
       marginRight:6,
       marginLeft:6,
       paddingTop:4
   },
   tachoyprecio:{
    display:"flex",
    justifyContent:"space-around",
   },
   precio:{
       marginTop:20
   }
})

export default ItemCarrito 

