import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator ,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, } from "@react-navigation/drawer";
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
import {Icon, Button} from 'react-native-elements';


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


const Drawer = createDrawerNavigator()
const iconos = {
    Home: "home",
    About: "info",
    Shop: "shopping-bag",
}

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
        <ShopStack.Screen name="Products" component={Products} />
    </HomeStack.Navigator>
);


const ShopStack = createStackNavigator();
const ShopStackScreen = () => (
    <ShopStack.Navigator>
        <ShopStack.Screen name="Products" component={Products} />
        <ShopStack.Screen name="OneProduct" component={OneProduct} />

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
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Shop" component={ShopStackScreen} />
            <Tab.Screen name="About" component={About} />
        </Tab.Navigator>

    );
}

const DrawerButton = (props) => {
    return(
        <Button
            title={`  ${props.title}`}
            onPress={() =>  {props.navigate(props.url)}}
            buttonStyle={{width:250, borderRadius:6, alignSelf:'center',backgroundColor:"#587984"}}
            icon={<Icon  name={props.icono} type='font-awesome' size={25} color="#E6EFF1"/>}
        />                
    )
}

const CerrarSeccion = () => {
    return(
        <Button
            title={`  Log Aut`}
            onPress={() => {}}
            buttonStyle={{width:150, borderRadius:6, alignSelf:'center',backgroundColor:"#587984"}}
            icon={<Icon  name={'sign-in'} type='font-awesome' size={25} color="#E6EFF1"/>}
        />                
    )
}

const CustomDrawerContent = (props) => { 
    return (<>
        <View style={{backgroundColor:'#9EA6A9',flex:1}}>            
            <View style={{backgroundColor:'#9EA6A9',flex:1}} >
                <View style={{justifyContent:'center',backgroundColor:'#DAE4E7', borderRadius:60, marginBottom:30}}>   
                    <ImageShop source={require('../Assets/botLogo.png')} height={200} width={200} margin={0}/>
                </View>
                <View  style={{flex:0.55,justifyContent:'space-between'}}>            
                    <DrawerButton title={"Home"} url={"Home"} icono={"home"} navigate={props.navigation.navigate}/>
                    <DrawerButton title={"LogIn"} url={"LogIn"} icono={"sign-in"} navigate={props.navigation.navigate}/>
                    <DrawerButton title={"SignUp"} url={"SignUp"} icono={"user-plus"} navigate={props.navigation.navigate}/>
                    <DrawerButton title={"Profile"} url={"Profile"} icono={"user"} navigate={props.navigation.navigate}/>
                    <DrawerButton title={"FAQs"} url={"FAQs"} icono={"question-circle"} navigate={props.navigation.navigate}/>
                </View>       
            </View>
            <View style={{width:'100%',justifyContent:'center', flex:0.1, backgroundColor:'#A9C4CD', borderTopEndRadius:40, borderTopLeftRadius:40}}>
                    <CerrarSeccion/>        
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


