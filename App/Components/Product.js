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
            <Text  style={{ alignSelf: 'center' }}>{props?.product.title}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:6}}>
                <Text>{`$ ${props?.product.price}`}</Text>
                <ContainerColors >
                    {variantsAux.map((variant,index) => <ImageShopChica key={index} style={{ backgroundColor: 
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
                                                                                    variant.color === 'Grey' ? '#303B4F' :  variant.color === 'Egg Shell' ? '#E9DFD5':''}`
                        }} />)}
                        </ContainerColors>
            </View>
            </FotosChicas>
        </Arcticulo>
    )
}

const ImageShop = styled.Image`
    height: 120px;
    width: 110px;
    alignSelf:center;
    borderRadius: 0px;
    marginBottom: 10px ;
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
    height: 180px;
    width: 150px;
    backgroundColor: white;
    color: black;
    margin: 10px;
    display:flex;
    borderRadius: 5px;        
    flexDirection: column;
    padding: 2px;
`;


export default Product
