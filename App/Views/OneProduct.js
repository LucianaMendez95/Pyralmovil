import React, {useState, useEffect} from "react"
import {StyleSheet,Share , Text, View, ScrollView,TouchableOpacity} from "react-native"
import {LOCAL_HOST, IMAGE} from '../Constants/index'
import styled from 'styled-components'
import ScrollProducts from '../Components/ScrollProducts'
import { Rating, Icon, Button} from 'react-native-elements';
import { UpdateCart } from '../Constants/funcionesCarrito'
import Toast from 'react-native-tiny-toast'

const onShare = async (product) => {
        const result = await Share.share({
            title:`Oferta de product en ${product}`,
            message:`Oferta de product en ${product}`,
      });
};
const BoxSize = (props) => {
    const styleBox = (props.variant.size === props.size)? {width:50,backgroundColor:'black', height:50,borderWidth:1,
        justifyContent:'center',margin:0}:{width:50,backgroundColor:'white', height:50,borderWidth:1,
        justifyContent:'center', margin:0}
    const styleText = (props.variant.size === props.size)? {textAlign:'center',color:'white',fontSize:20,fontWeight:'bold'}:
        {textAlign:'center',fontSize:20,fontWeight:'bold'}
    return(
        <TouchableOpacity  onPress={() => props.setProducts({...props.products,size:props.variant.size})} 
            label={`Size ${props.variant.size}`} 
            style={styleBox}>
            <Text style={styleText}>{props.variant.size}</Text>
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
const toast = (product) =>  {
        return(
            Toast.show(`Add ${product.title}`,{
            position: Toast.position.center,
            containerStyle:{backgroundColor:'whitesmoke',marginBottom:'50%'},
            textStyle: {color:'#111111'},
            imgSource: require('../Assets/simbolo-correcto.png'),
            imgStyle: {width:40,height:40},
            mask: true,
            maskStyle:{},
        }))
}

export default function OneProduct(props){
    const product = props.route.params.item
    const [products, setProducts] = useState({photo: product.variants[0].photo,
            title: product.title, quantity:1, _id: product._id, price:product.price,
            size: product.variants[0].size, color: product.variants[0].color    
    })
    const addToCart = (product) => {
        UpdateCart(product)
        toast(product)    
    }
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
                <ContainerColors >
                    {borrarRepe(product.variants).map((variant,index) => <ImageShopChica key={index} style={{ backgroundColor: 
                        `${variant.color === 'Wine' ? '#44282D' :
                                variant.color === 'Black' ? '#111111' :
                                    variant.color === 'DarkGrey' ? '#34343D' :
                                        variant.color === 'White' ? 'whitesmoke' :
                                            variant.color === 'Blush' ? '##EFC6B4' :
                                                variant.color === 'Flint' ? '#C2B1C1' :
                                                    variant.color === 'Honeycomb' ? '#C98E2A' :
                                                        variant.color === 'Paloma' ? '#F2BBBE' :
                                                            variant.color === 'Salt' ? '#ECE9E2' :
                                                                variant.color === 'Sage' ? '#737B7D' :
                                                                    variant.color === 'Anchor' ? '#4B4545' :
                                                                        variant.color === 'Red Rum' ? '#774A47' :
                                                                            variant.color === 'Golden Harvest' ? '#E6B968' :
                                                                                variant.color === 'Military Moss' ? '#695530' :
                        variant.color === 'Grey' ? '#303B4F' :  variant.color === 'Egg Shell' ? '#E9DFD5':''}`,border: ` ${variant.color === 'Cream' && '1px solid grey'}`
                        }} />)}
                        </ContainerColors>
                
            </View>
            <View style={{flexDirection:'row', justifyContent:'center',marginTop:10}}>
                {(product?.variants?.filter(vari => vari.color === products.color))?.map((vari,index) =>(
                 <BoxSize variant={vari} size={products.size} products={products} key={index} setProducts={setProducts}/>))}
            </View>
            <View style={{flexDirection:'row',width:'87%',alignSelf:'center',
                    justifyContent:'space-around',margin:3}}>
                <Text style={{fontSize:20,alignSelf:'center'}}>{`Size  ${products.size}`}</Text>
                <Text style={{fontSize:30}}>{`$ ${product.price}`}</Text>
            </View>        
            <Button
                titleStyle={{fontSize:25}}
                title="   Add To Cart"
                onPress={() =>  addToCart(products)}
                buttonStyle={{width:280,height:50, borderRadius:6, alignSelf:'center',backgroundColor:"black"}}
                icon={<Icon  name="shopping-bag" type='font-awesome' size={20} color="#FFFFFF"/>}
            />                
            <ScrollProducts {...props}/>
        </ScrollView>

    )
} 


const ImageShopChica = styled.View`
    alignSelf: center;
    marginRight: 2px;
    borderRadius: 100px;
    width: 35px;
    height: 35px;
    borderWidth:1;
`;


const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}px`};
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;


const ContainerColors = styled.View`
    alignSelf: center;
    flexDirection: row;
    marginTop:5px;
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

