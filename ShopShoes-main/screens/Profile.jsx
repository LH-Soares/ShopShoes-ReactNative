import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';


const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(()=> {
    checkExistingUser();
  },[]);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    
    try {
      const currentUser = await AsyncStorage.getItem(useId);

      if(currentUser !== null){
        const parsedData = JSON.parse(currentUser)
        setUserData(parsedData)
        setUserLogin(true)
      }else{
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log("Error retrieving the data:", error)
    }

  };

  const userLogout = async()=> {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([useId, 'id']);
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log("Error loggin out the user:", error)
    }
  };


  const cacheClear = async()=> {
    const id = await AsyncStorage.getItem('id')
    const userId = `favorites${JSON.parse(id)}`;
    try {
      await AsyncStorage.removeItem(userId);
      navigation.replace('Bottom Navigation')
    } catch (error) {
      console.log("Error loggin out the user:", error)
    }
  };


  const logout = () => {
    Alert.alert(
      "Sair",
      "Deseja sair?",
      [
        {
          text: "Cancelar", onPress: ()=> console.log("cancelar a saida")
        },
        {
          text: "Sair", onPress: ()=> userLogout()
        },
        {defaultIndex : 1 }
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      "Limpar cacher",
      "Deletar dados salvos?",
      [
        {
          text: "Cancelar", onPress: ()=> console.log("Cancelar limpeza de cache")
        },
        {
          text: "Limpar", onPress: ()=> cacheClear()
        },
        {defaultIndex : 1 }
      ]
    )
  }

  const deleteAccount = () => {
    Alert.alert(
      "Deletar conta",
      "Deletar conta logada?",
      [
        {
          text: "Cancelar", onPress: ()=> console.log("cancela a exclusão")
        },
        {
          text: "Deletar", onPress: ()=> console.log("delete account pressed")
        },
        {defaultIndex : 1 }
      ]
    )
  }
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    try {
      await image (selected._id);
      setSelect(result.assets[0].uri); 
      console.error('Erro ao alterar a foto:', error.message);
    } catch (error) {
      console.log('Foto alterada com sucesso!');
    }
    }
  };
  return (
    <View style={style.container}>
      <View style={style.container}>
        <StatusBar backgroundColor={COLORS.gray} />

        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/espaco-colorido-do-ceu-noturno-nebulosa-e-galaxias-no-espaco-fundo-do-conceito-de-astronomia_303714-2093.jpg")}
            style={style.cover}
          />
        </View>
        
        <View style={style.profileContainer}>    

        {userLogin === true ? (
          <View >
    <Image source={require("../assets/images/userDefault.png")} style={style.profile} />
    <Image source={{ uri: image }} style={style.profilen} />
    <Text onPress={pickImage} style={style.loginBt}>Alterar foto</Text>
    </View>
  ) : (
    <Image  source={require("../assets/images/istockphoto-1016744034-612x612.jpg")}
    style={style.profile}
    />
  )} 
          
          <Text style={style.name}>
            {userLogin === true ? userData.username : "Por favor faça login em sua conta"}
          </Text>

          <View>
  
</View>

          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <View style={style.loginBtn}>
                <Text style={style.buttonText}>L O G I N </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={style.loginBtn}>
              <Text style={style.buttonText}>{userData.email} </Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
              <View style={style.menuWrapper}>
                <TouchableOpacity onPress={()=> navigation.navigate('Favorites')}>
                    <View style={style.menuItem(0.2)}>
                      <MaterialCommunityIcons 
                        name="heart-outline"
                        color={COLORS.primary}
                        size={24}
                      />
                      <Text style={style.menuText}>Favoritos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('Orders')}>
                    <View style={style.menuItem(0.2)}>
                      <MaterialCommunityIcons 
                        name="truck-delivery-outline"
                        color={COLORS.primary}
                        size={24}
                      />
                      <Text style={style.menuText}>Envios</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                    <View style={style.menuItem(0.2)}>
                      <SimpleLineIcons 
                        name="bag"
                        color={COLORS.primary}
                        size={24}
                      />
                      <Text style={style.menuText}>Carinho</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> clearCache()}>
                    <View style={style.menuItem(0.2)}>
                      <MaterialCommunityIcons 
                        name="cached"
                        color={COLORS.primary}
                        size={24}
                      />
                      <Text style={style.menuText}>Limpar cache</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> deleteAccount()}>
                    <View style={style.menuItem(0.2)}>
                      <AntDesign 
                        name="deleteuser"
                        color={COLORS.primary}
                        size={24}
                      />
                      <Text style={style.menuText}>Deletar conta</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={()=> logout()}>
                    <View style={style.menuItem(0.2)}>
                      <AntDesign 
                        name="logout"
                        color={COLORS.primary}
                        size={24}
                      />
                      <Text style={style.menuText}>Sair</Text>
                    </View>
                </TouchableOpacity>
              </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;

