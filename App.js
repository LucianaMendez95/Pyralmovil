import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Button, Overlay } from 'react-native-elements';
import Tab from './App/Nagivator/TabV'
import ItemCarrito from './App/Components/ItemCarrito';
import {getValue} from './App/Constants/FuncAsyncStorage'
import { ScrollView } from 'react-native-gesture-handler';
import Checkout from './App/Components/Checkout';



export default function App() {
   

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(!visible);
    };

    const [adress, setadress] = useState(false);

    const checkout =()=>{
        setadress(!adress);
    }
 
const [listProduct, setListProduct ] = useState([])
    useEffect(() => {
        getValue('products',true)
        .then((products => setListProduct(products)))
    },[])


 
const precioTotal = () =>{
  let precioTotal = 0
  listProduct.map(product =>{
    precioTotal += Number(product.price)
  })
  return `${precioTotal}`
 }


    return (<>
        <Tab/>
        <View >
            <MaterialCommunityIcons style={styles.cart} onPress={toggleOverlay} name="cart-outline" size={24} color="black" />
            <Overlay  isVisible={visible} onBackdropPress={toggleOverlay} >
             
             {!adress 
              ?  <View style={styles.ropaDelCarrito}>
                    <ScrollView alignSelf='center' style={{marginTop:5}}>
                       {listProduct.map((prod,index) =><ItemCarrito product={prod} key={index}/>)}
                    </ScrollView >
                    <View style={styles.totalPrecio}>
                        <Text style={styles.Textprecio}>Total</Text>
                        <Text style={styles.Textprecio}>${precioTotal()}</Text>
                    </View>
                    <Text onPress={checkout} style={styles.butButton}>Buy</Text>
                 </View>

            :<View> 
                <Checkout listProduct={listProduct} preciototal={precioTotal()}/>
                <Text onPress={checkout} style={styles.butButton}>Back</Text>
             </View>} 
          </Overlay>    
       </View>
    </>);
}

const styles = StyleSheet.create({
    cart:{
        position: 'absolute', 
        right:   10,
        bottom: 690,
   },
    ropaDelCarrito:{
        backgroundColor:'#F3F7F8',
        height: 500,
        width: 300,
        borderRadius:15,
        alignSelf:'center',
   },
   totalPrecio:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-between",
       marginRight:30,
       marginLeft:30,
       marginTop:15,
       marginBottom: 15,
   },
   Textprecio:{
       color:"black",
       fontWeight: "bold",
       fontSize:20

   },
   butButton:{
        color:"black",
        textAlign:"center",
        fontWeight:"bold",
        backgroundColor: "white",
        borderRadius:5,
        marginRight:100,
        marginLeft:100,
        marginBottom:5,
        paddingTop:4,
        paddingBottom:4,
        marginTop: 5
   }
})


