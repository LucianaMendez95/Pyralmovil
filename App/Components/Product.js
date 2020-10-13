import React ,{useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components'
import { colors, IMAGE, LOCAL_HOST } from '../Constants/index'

const Product = (props) => {
    const [foto, setfoto] = useState({ color: props?.product.variants[0].photo })
    //const cambiarFoto = (foto) => setfoto({...foto, color: foto})

    const variantsAux = []
    const borrarRepe = (variants) => {
        variants.forEach(vari => {
            if (variantsAux.filter(varia => varia.color === vari.color).length !== 0)
                return
            variantsAux.push(vari)
        })
        return variantsAux
    }
    borrarRepe(props?.product.variants)
    const url = foto.color.replace(LOCAL_HOST,IMAGE)
    return (
        <Arcticulo>
            <ImageShop source={{ uri: url }} />
            <FotosChicas>
            <Text  style={{ alignSelf: 'center', width:180, textAlign:"center", marginTop:3 }}>{props?.product.title}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:6}}>
                <Text>{`$ ${props?.product.price}`}</Text>
                <ContainerColors >
                    {variantsAux.map((variant,index) => <ImageShopChica key={index} style={{ backgroundColor: 
                        `${variant.color === 'Anchor' ? '#4B4545' :
                        variant.color === 'Black' ? '#111111' :
                            variant.color === 'Blush' ? '#B3C1EF' :
                                variant.color === 'Brown' ? '#576B86' :
                                    variant.color === 'Cream' ? '#FFF0C9' :
                                        variant.color === 'Chateau' ? 'rgb(159, 103, 52)' :
                                            variant.color === 'DarkGrey' ? '#34343D' :
                                                variant.color === 'Egg Shell' ? '#E9DFD5' :
                                                    variant.color === 'Flint' ? '#C2B1C1' :
                                                        variant.color === 'Golden Harvest' ? '#E6B968' :
                                                            variant.color === 'Grey' ? '#303B4F' :
                                                                variant.color === 'Granite' ? '#B4AFB1' :
                                                                    variant.color === 'Honeycomb' ? '#C98E2A' :
                                                                        variant.color === 'Moonlight' ? 'rgb(225, 212, 197)' :
                                                                            variant.color === 'Military Moss' ? '#695530' :
                                                                                variant.color === 'Mountain Mist' ? 'rgb(169, 143, 135)' :
                                                                                    variant.color === 'Night Owl' ? 'rgb(48, 59, 79)' :
                                                                                        variant.c0lor === 'Ocean Storm' ? '#4F3B30' :
                                                                                            variant.color === 'Paloma' ? '#F2BBBE' :
                                                                                                variant.color === 'Red Rum' ? '#774A47' :
                                                                                                    variant.color === 'Salt' ? '#ECE9E2' :
                                                                                                        variant.color === 'Sage' ? '#737B7D' :
                                                                                                            variant.color === 'Sweet Basil' ? 'rgb(128, 125, 94)' :
                                                                                                                variant.color === 'Vintage' ? 'rgb(85, 99, 115)' :
                                                                                                                    variant.color === 'Wine' ? '#44282D' :
                                                                                                                        variant.color === 'White' ? 'whitesmoke' : ''}`

                        }} />)}
                        </ContainerColors>
            </View>
            </FotosChicas>
        </Arcticulo>
    )
}

const ImageShop = styled.Image`
    height: 150px;
    width: 110px;
    alignSelf:center;
    borderRadius: 0px;
    marginBottom: 0px ;
`;

const ContainerColors = styled.View`
    alignSelf: center;
    flexDirection: row;
`;

const ImageShopChica = styled.View`
    alignSelf: center;
    marginRight: 2px;
    borderRadius: 100px;
    width: 15px;
    height: 15px`
    ;

const FotosChicas = styled.View`
    height: 50px;
    width: 135px;
    alignSelf: center;
    padding: 1px;
    display: flex;
    borderTopColor: black;
    borderTopWidth: 1px;
    justifyContent:space-between;
`;
const Arcticulo = styled.View`
    height: 210px;
    width: 180px;
    backgroundColor: white;
    color: black;
    margin: 10px;
    display:flex;
    borderRadius: 5px;        
    flexDirection: column;
    padding: 2px;
`;


export default Product
