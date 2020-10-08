import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {Overlay, Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import ItemCarrito from './ItemCarrito';
import {getValue} from '../Constants/FuncAsyncStorage'
import { ScrollView } from 'react-native-gesture-handler';
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
        setadresss(false);
    };
    const [adresss, setadresss] = useState(false);

    const checkout =()=>{
        setadresss(!adresss);
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

  const [cartelsinproductos, setcartelsinproductos ] = useState(false)

    const noproducts = () =>{
    if (listProduct === "null"){
        setcartelsinproductos(true)
    }
    }


    return (<>
        <View >
            <MaterialCommunityIcons style={styles.cart} onPress={toggleOverlay} name="cart-outline" size={35} color="black" />
            <Overlay  isVisible={visible} onBackdropPress={toggleOverlay} >
             {cartelsinproductos ? <Text>Hola</Text> :<></>}
             {!adresss
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
                    ?<View style={styles.botones}>
                        {!Payy
                            ? <Text onPress={checkout} style={styles.butButton}>Back</Text>
                            :<></>}
                            <Text onPress={Paymethod} style={styles.butButton}>{!Payy ? "Next" :"Back"}</Text>
                            {Payy 
                            ? <Text onPress={cartel} style={styles.butButton}>Finish</Text>
                            :<></>}
                    </View>
                    :<Text onPress={toggleOverlay} style={styles.butButton}>Close</Text>}
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
        marginRight:40,
        marginLeft:40,
        marginBottom:5,
        paddingTop:4,
        paddingBottom:4,
        marginTop: 5
   },
   botones:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-around"
   }
})
