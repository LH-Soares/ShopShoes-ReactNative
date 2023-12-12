import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";




const Image = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const endpoint = `http://10.5.4.241:3000/api/${token}`;

        const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + JSON.parse(token)
        };

        await axios.put(endpoint, { headers });
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

export default Image