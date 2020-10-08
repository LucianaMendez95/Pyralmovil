import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {Overlay, Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import ItemCarrito from './ItemCarrito';
import {getValue} from '../Constants/FuncAsyncStorage'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Checkout from './Checkout';
import Payment from './Payment'
import Cartelfinish from './Cartelfinish'

export default function Carrito(){
    const [visible, setVisible] = useState(false);
    const [update, setUpdate] = useState(true)
    
    const toggleOverlay = () => {
        setUpdate(!update)
        setVisible(!visible);
        setcartell(false)
        setPayy(false);
        setadress(false);
    };
    const [adress, setadress] = useState(false);

    const checkout =()=>{
        setadress(!adress);
    }
    

    const [Payy, setPayy] = useState(false);

    const Paymethod =()=>{
        setPayy(!Payy);
    }

    const [cartell, setcartell] = useState(false);

    const cartel =()=>{
        setcartell(!cartell);
    }
    
 
    const [listProduct, setListProduct ] = useState([])
    useEffect(() => {
        getValue('cart',true)
        .then(products => {
            console.log(products)
            setListProduct(products)
        })
    },[update])

    const precioTotal = () =>{
        let precioTotal = 0
        listProduct.map(product =>{
          precioTotal +=  product.quantity * Number(product.price)
        })
        return `${precioTotal}`
       }      

 



    return (<>
        <View >
            <MaterialCommunityIcons style={styles.cart} onPress={toggleOverlay}  name="cart-outline" size={35} color="black" />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} >
                {listProduct.length === 0
                   && <View style={styles.cartel}>
                        <Text style={styles.titulovacio}  >Your cart is empty</Text>
                        <Text style={styles.mensaje}>Not sure what to buy? Thousands of products await you!</Text>
                        <Text onPress={toggleOverlay} style={styles.button}>Close</Text>
                     </View>}
                
             {!adress
              ?  <View style={[styles.ropaDelCarrito, listProduct.length === 0 && {height:30} ]}>

                    <ScrollView alignSelf='center' style={{marginTop:50}}>
                       {listProduct.map((prod,index) =><ItemCarrito product={prod} key={index}/>)}
                    </ScrollView >
                    {listProduct.length > 0 && 
                    <View style={styles.totalPrecio}>
                        <Text style={styles.Textprecio}>Total</Text>
                        <Text style={styles.Textprecio}>${precioTotal()}</Text>
                    </View>} 
                    {listProduct.length > 0 && 
                    <TouchableOpacity style={styles.butButton}>    
                        <Text onPress={()=>checkout()} 
                            style={{color:'white',fontSize:20,fontWeight:'bold', textAlign:'center'}} >Buy</Text>
                    </TouchableOpacity>    }          
                 </View>

            :<View> 
                {!Payy
                ?<Checkout listProduct={listProduct} preciototal={precioTotal()}/>
                : <View>
                   {!cartell
                   ?<Payment preciototal={precioTotal()}/>
                   :<Cartelfinish/> 
                    }
                    
                 </View>
                
                }
                <View style={styles.botones}>
                  {!cartell
                    ?<View style={{justifyContent:'space-around',width:'70%' ,flexDirection:'row'}}>
                        {!Payy
                            ? <Text onPress={checkout} style={styles.button}>Back</Text>
                            :<></>}
                            <Text onPress={Paymethod} style={styles.button}>{!Payy ? "Next" :"Back"}</Text>
                            {Payy 
                            ? <Text onPress={cartel} style={styles.button}>Finish</Text>
                            :<></>}
                    </View>
                    :<Text onPress={toggleOverlay} style={styles.button}>Close</Text>}
                </View>

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
    button:{
        color:'white',
        backgroundColor:'#111111',
        padding:5,
        borderRadius:2,
        
    },    
    ropaDelCarrito:{
        backgroundColor:'white',
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
        backgroundColor: "#111111",
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
   botones:{
       display:"flex",
       flexDirection:"row",
        justifyContent:"space-around",
   },
   cartel:{
       width:300,
       display:"flex",
       justifyContent:"center",
       alignItems:"center",
       height: 300,
       width: 300,
   },
   titulovacio:{
       fontWeight:"bold",
       marginBottom:30
   },
   mensaje:{
       paddingRight:5,
       paddingLeft:5,
       textAlign:"center",
       marginBottom:30
   }
})
