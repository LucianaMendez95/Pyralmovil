import React, {useState, useEffect} from 'react';
import { Text, View,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../Views/Home'
import Products from '../Views/Products'
import LogInt from '../Components/LogInt'
import { FontAwesome } from '@expo/vector-icons';
import OneProduct from '../Views/OneProduct'
import SignUp from '../Components/SignUp';
import Profile from '../Views/Profile';
import FAQs from '../Views/FAQs';
import About from '../Views/About';
import styled from 'styled-components'
import {Icon} from 'react-native-elements';
import { getValue, removeKey } from '../Constants/FuncAsyncStorage'
import Header from '../Components/Header';
import Toast from 'react-native-tiny-toast'
const imagenOferta = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3IDDLHd5gXFm1_BziIeSNDyTxUwnDPV-IgQ&usqp=CAU'

const toast = () =>  {
    return(
        Toast.show("Coming Soon",{
        position: Toast.position.center,
        containerStyle:{backgroundColor:'grey',marginBottom:'50%'},
        textStyle: {color:'#111111'},
        mask: true,
        maskStyle:{},
    }))
}


const Container = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const ImageShop = styled.Image`
    height: ${props => `${props.height}px`};
    width: ${props => `${props.width}px`};
    alignSelf:center;
    borderRadius: 5px;
    marginBottom: ${props => `${props.margin}px`};
`;

const Ofertas = styled.ImageBackground`
    marginTop:30px;
    alignSelf:center;
    width:90%;
    borderRadius:100px;
`


const Drawer = createDrawerNavigator()
const iconos = {
    Home: "home",
    About: "info",
    Shop: "shopping-bag",
}

const HomeStack = createStackNavigator();
const HomeStackScreen = (props) => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home}
            options={{ headerTitle: () => <Header {...props} title={'PYRAL'}/>}}
        />
        <ShopStack.Screen name="Products" component={Products} 
            options={{ headerTitle: () => <Header {...props} title={'SHOP'}/>}}
        />
        <ShopStack.Screen name="OneProduct" component={OneProduct} 
            options={{ headerTitle: () => <Header {...props} title={'SHOP'}/>}}
        />    
    </HomeStack.Navigator>
);


const ShopStack = createStackNavigator();
const ShopStackScreen = (props) => (
    <ShopStack.Navigator>
        <ShopStack.Screen name="Products" component={Products} 
            options={{ headerTitle: () => <Header {...props} title={'SHOP'}/>}}
        />
        <ShopStack.Screen name="OneProduct" component={OneProduct} 
            options={{ headerTitle: () => <Header {...props} title={'SHOP'}/>}}
        />
    </ShopStack.Navigator>
)

const Tab = createBottomTabNavigator();
const TabsScreen = (props) => {
    return (
        <Tab.Navigator initialRouteName={props.route.name}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ size, color }) => <FontAwesome name={iconos[route.name]} size={size} color={color} />
            })}
            tabBarOptions={{
                activeTintColor: '#201F22',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen}/> 
            <Tab.Screen name="Shop" component={ShopStackScreen} />
            <Tab.Screen name="About" component={About}/>
        </Tab.Navigator>

    );
}

const DrawerButton = (props) => {
    return(
        <TouchableOpacity style={{width:'100%',paddingLeft:5,paddingRight:20,justifyContent:'space-between',borderBottomWidth:1,
            borderRadius:5,backgroundColor:"whitesmoke", flexDirection:'row',borderBottomColor:'gray' }}
            onPress={() =>  {props.navigate(props.url,{render:props.render, setRender:props.setRender})}}>
            <View style={{flexDirection:'row'}}>
                <Icon style={{alignSelf:'center',width:35,height:30}}  name={props.icono} type='font-awesome' size={30} color="#111111"/> 
                <Text style={{color:'#111111',alignSelf:'center', fontSize:20,fontWeight:'600'}}>{`   ${props.title}`}    </Text>
            </View>       
            <Text style={{fontSize:25, alignSelf:'center'}}>{">"}</Text>            
        </TouchableOpacity>
    )
}

const CerrarSeccion = (props) => {
    const log = () => {
        removeKey('user')
        props.setRender(!props.render)
    }
    
    return(
        <TouchableOpacity style={{width:'100%',paddingLeft:5,paddingRight:20,justifyContent:'space-between',borderBottomWidth:1,
            borderRadius:5,backgroundColor:"whitesmoke", flexDirection:'row',borderBottomColor:'gray' }}
            onPress={() => log()}>
            <View style={{flexDirection:'row'}}>
                <Icon style={{alignSelf:'center',width:35,height:30}}  name={props.icono} type='font-awesome' size={30} color="#111111"/> 
                <Text style={{color:'#111111',alignSelf:'center', fontSize:20,fontWeight:'bold'}}>{`  Log Out`}</Text>
            </View>       
            <Text style={{fontSize:25, alignSelf:'center'}}>{">"}</Text>            
        </TouchableOpacity>
    )
}

const CustomDrawerContent = (props) => {
    const [user, setUser] = useState({})
    const [render, setRender] = useState(true)
    useEffect(() => {
        getValue('user', true)        
        .then(userP => {
            if(userP === null){
                setUser(userP)}
            else{
                setUser({...userP})}
        })
    },[render])

    return (<>
        <View style={{backgroundColor:'whitesmoke',flex:1}}>            
            <View style={{backgroundColor:'whitesmoke',flex:1}} >
                <View style={{justifyContent:'center',alignSelf:'center',width:'90%',
                    paddingTop:50,backgroundColor:'whitesmoke', borderRadius:60, marginBottom:30}}>  
                    <ImageShop source={require('../Assets/log2.png')} height={100} width={100} margin={0}/>
                    <Text style={{alignSelf:'center',color:'black' ,fontSize:25,fontWeight:'bold'}}>{user === null?  "GUEST":user.mail}</Text>
                </View>
                    <View  style={user !== null? {flex:0.2,justifyContent:'space-between'}:
                        {flex:0.4,justifyContent:'space-between'}}>            
                    <DrawerButton title={"Home"} url={"Home"} icono={"home"} navigate={props.navigation.navigate}/>
                    { user === null && <DrawerButton title={"LogIn"} url={"LogIn"} 
                        render={render} setRender={setRender} icono={"sign-in"}  navigate={props.navigation.navigate}/>}
                    {user === null && <DrawerButton title={"SignUp"} url={"SignUp"} 
                        render={render} setRender={setRender} icono={"user-plus"} navigate={props.navigation.navigate}/>}
                    {user !== null && <DrawerButton title={"Profile"} url={"Profile"} 
                            icono={"user"} navigate={props.navigation.navigate}/>}
                </View>
                    <TouchableOpacity onPress={() => toast()}>
                    <Ofertas source={{uri:imagenOferta}} imageStyle={{borderRadius:5}}>
                        <Text style={{color:'white',alignSelf:'center',fontSize:35, fontWeight:'bold'}}>
                            new collection
                        </Text>
                    </Ofertas>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%',justifyContent:'center', 
                flex:0.15, backgroundColor:'whitesmoke', borderTopEndRadius:40, borderTopLeftRadius:40}}>
                    <DrawerButton title={"FAQs"} url={"FAQs"} icono={"question-circle"} navigate={props.navigation.navigate}/>
                  { user !== null && <CerrarSeccion render={render} setRender={setRender}/>}
            </View>    
        </View>            
    </>)
}

export default function TabV() {
    return (

        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={TabsScreen} />
                <Drawer.Screen name="LogIn" component={LogInt} />
                <Drawer.Screen name="SignUp" component={SignUp} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="FAQs" component={FAQs} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


