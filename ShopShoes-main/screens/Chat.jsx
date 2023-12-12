import React, { useState, useEffect} from 'react';
import { View, TextInput, Text,TouchableOpacity, Image } from 'react-native';
import sendMessage from '../hook/fetchChat';
import styles from './chat.style';
import {COLORS, SIZES} from "../constants"
import {Ionicons,Feather} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';



const MessageBubble = ({ text }) => (
  <View style={{ alignSelf: 'flex-end', backgroundColor:COLORS.primary, padding: 10, borderRadius: 10, margin: 5 }}>
    <Text style={{ color: 'white' }}>{text}</Text>
  </View>
);


const Chat = (navigation) => {
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
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


  const handleSendMessage = async () => {
    try {
      await sendMessage(message);
      setSentMessages([...sentMessages, message]);
      setMessage('');
      console.log('Mensagem enviada com sucesso!');
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
   
    <View style={{ flex: 1,  backgroundColor: COLORS.lightWhite }}>
      <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
        {sentMessages.map((msg, index) => (
          <MessageBubble key={index} text={msg} />
        ))}
      </View>
      {userLogin === false? (     
      <View style={styles.profileContainer}>
        <Text style={{ fontFamily: "extrabold",
        color: COLORS.primary,
        marginVertical: 5}}>Usuário não conectado</Text>
         <Ionicons name="alert-circle-outline" size={35} color={COLORS.primary}></Ionicons >
      </View>
    ) : (
      <View style={{padding:9}}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={message}
            onChangeText={(text) => setMessage(text)}
            placeholder="Mensagem"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSendMessage}>
            <Feather name="arrow-right" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
        </View>
      </View>
       )}
    </View>
   
  );
};
export default Chat;