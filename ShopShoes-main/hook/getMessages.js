import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const getMessages = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const endpoint = 'http://10.5.4.241:3000/api/message/messages';

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(token),
        };

        const response = await axios.get(endpoint, { headers });
        return response.data.map(msg => ({
          content: msg.content,
          timestamp: msg.timestamp,
          sender: msg.username,
        }));
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

export default getMessages