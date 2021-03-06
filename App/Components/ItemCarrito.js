import React,{useState, useEffect} from 'react';
import { EvilIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons'; 
import { View, Text, Button, StyleSheet } from 'react-native';
import {LOCAL_HOST, IMAGE} from '../Constants/index'
import { MaterialIcons } from '@expo/vector-icons'; 
import styled from 'styled-components'


const ItemCarrito = (props) => {
   

    const  [cantidad, setcantidad] = useState(0)
    console.log(cantidad)
   const sumar = () => {
    setcantidad({
        ...cantidad,
        cantidad: cantidad +1
    })

   }
   const restar = () => {
       if(cantidad > 0){
            setcantidad({
                ...cantidad,
                cantidad: cantidad -1
            })
        }
    }
console.log(props)
    const url = props.product.variants[0].photo.replace(LOCAL_HOST,IMAGE)
    console.log()
    return (
            <View style={styles.unelEmentoCarrito}>
                <ImageShop source={{uri:`${url}`}} width={100} height={80} margin={1}/>
                <View style={styles.tituloCantidad}>
                    <Text style={styles.titulo}>{props.product.title}</Text> 
                    <View style={styles.cantidad}>
                        <MaterialIcons name="remove" size={24} color="black" onPress={sumar}/>
                        <Text style={styles.numerocantidad}>{cantidad}</Text>
                        <Entypo name="plus" size={24} color="black" onPress={restar} />
                    </View>

                </View>

                <EvilIcons name="trash" size={35} color="black" />
            </View>
    )


}
            
const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}px`};
    resizeMode: contain;
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;


const styles = StyleSheet.create({
    unelEmentoCarrito:{
        width: 270,
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        backgroundColor:"white",
        borderBottomColor: "black",
        borderBottomWidth:1,
        paddingBottom:5,
        paddingTop:5,
        paddingRight:10,
        paddingLeft:10,

   },
   titulo:{
       fontWeight: "bold"
   },

   tituloCantidad:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

   },
   cantidad:{
       display:"flex",
       flexDirection: "row",
       marginTop: 25
   },
   numerocantidad:{
       marginRight:6,
       marginLeft:6,
       paddingTop:4
   }
  
})

export default ItemCarrito 

