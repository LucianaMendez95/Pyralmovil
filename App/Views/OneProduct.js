import React, {useState, useEffect} from "react"
import {StyleSheet,Share , Text, View, ScrollView,TouchableOpacity} from "react-native"
import {LOCAL_HOST, IMAGE} from '../Constants/index'
import styled from 'styled-components'
import ScrollProducts from '../Components/ScrollProducts'
import { Rating, Icon, Button} from 'react-native-elements';
import { UpdateCart } from '../Constants/funcionesCarrito'
import {Picker} from '@react-native-community/picker';

const onShare = async (product) => {
        const result = await Share.share({
            title:`Oferta de product en ${product}`,
            message:`Oferta de product en ${product}`,
      });
};
const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "A wild toast appeared!",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
};
const BoxSize = (props) => {
    const styleBox = (props.variant.size === props.size)? {width:50,backgroundColor:'#787878', height:50,borderWidth:1,
        justifyContent:'center',margin:0.1}:{width:50,backgroundColor:'#C5C2C2', height:50,borderWidth:1,
        justifyContent:'center', margin:0.1}
    return(
        <TouchableOpacity  onPress={() => props.setProducts({...props.products,size:props.variant.size})} 
            label={`Size ${props.variant.size}`} 
            style={styleBox}>
            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>{props.variant.size}</Text>
        </TouchableOpacity>
    )
}

const borrarRepe = (variants) => {
    const variantsAux = []
    variants.forEach(vari => {
        if (variantsAux.filter(varia => varia.color === vari.color).length !== 0)
            return
        variantsAux.push(vari)
    })
    return variantsAux
}

export default function OneProduct(props){
    const product = props.route.params.item
    const [products, setProducts] = useState({photo: product.variants[0].photo,
            title: product.title, quantity:1, _id: product._id, price:product.price,
            size: product.variants[0].size, color: product.variants[0].color    
    })

    const image = products.photo.replace(LOCAL_HOST,IMAGE)
    const rating = (product.reviews === 0)? product.stars:product.stars/product.reviews
    return(
        <ScrollView style={{alignSelf:'center',backgroundColor:'white'}}>
            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <View style={{alignSelf:'center'}}>
                    <Text style={{fontWeight:'bold', fontSize:20,marginLeft : 20}}
                        >{product.title}
                    </Text>
                    <Rating startingValue={rating} 
                        style={{width:125}} 
                        imageSize={17} type='custom' ratingColor="#060B0C" 
                    />
                </View>
                <Icon raised name='share-alt'  type='font-awesome' style={{alignSelf:'center'}}
                    color='#080808' onPress={() => onShare(product.title)} 
                />
            </View>            
            <View style={{ alignItems:'center'}}>
                <ImageShop source={{uri:image}} margin={0} width={310} height={350}/>
                <ScrollView horizontal={true} 
                        style={{width:150, height:50}}>
                    {borrarRepe(product.variants).map((variant,index) => (
                    <TouchableOpacity key={index} 
                        style={{width:50}}
                        onPress={() =>{
                            return setProducts({...products,...variant}) }}>
                            <ImageShop source={{uri:variant.photo.replace(LOCAL_HOST,IMAGE)}}  
                                width={50} margin={0} height={60} key={variant.photo}/>
                        </TouchableOpacity>))}
                </ScrollView>             
            </View>
            <View style={{flexDirection:'row', justifyContent:'center',marginTop:10}}>
                {(product?.variants?.filter(vari => vari.color === products.color))?.map((vari,index) =>(
                 <BoxSize variant={vari} size={products.size} products={products} key={index} setProducts={setProducts}/>))}
            </View>
            <View style={{flexDirection:'row',width:'87%',alignSelf:'center',
                    justifyContent:'space-around',margin:3}}>
                <Text style={{fontSize:30}}>{`Size  ${products.size}`}</Text>
                <Text style={{fontSize:30}}>{`$ ${product.price}`}</Text>
            </View>        
            <Button
                titleStyle={{fontSize:25}}
                title="   Add To Cart"
                onPress={() =>  UpdateCart(products)}
                buttonStyle={{width:280,height:50, borderRadius:6, alignSelf:'center',backgroundColor:"black"}}
                icon={<Icon  name="shopping-bag" type='font-awesome' size={20} color="#FFFFFF"/>}
            />                
            <ScrollProducts {...props}/>
        </ScrollView>

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
    allComponent:{
        display: 'flex',
        justifyContent:'center',
        alignSelf:'center',
        marginTop: 50,
    },
    title:{
        fontWeight:'500',
        fontSize:30,
        alignSelf:'center',
        marginBottom : 5
    },
    imagen:{
        height: 200,
        width: 200,
        marginTop: 20,
        marginBottom: 20,
        borderColor:'black',
        borderWidth: 2,
    },
    colorContainer:{
        display: 'flex',
        flexDirection:'row',
        marginTop: 15,
    },
    color:{
        height: 20,
        width: 20,
        marginRight: 2,
        marginLeft: 2, 
    }
})

