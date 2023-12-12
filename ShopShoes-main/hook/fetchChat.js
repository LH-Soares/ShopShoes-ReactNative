import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const sendMessage = async (content) => {
  try {
    const token = await AsyncStorage.getItem('token');
  
   

    const endpoint = 'http://10.5.4.241:3000/api/message/send'; 
    const data = {
      content: content,
    
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(token),
    };

    await axios.post(endpoint, data, { headers });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export default sendMessage;