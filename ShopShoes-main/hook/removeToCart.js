import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchCart from "./fetchCart";




const RemoveToCart = async (cartItem) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const endpoint = `http://10.5.4.241:3000/api/cart/${cartItem}`;

        const headers = {
            'Content-Type': 'application/json',
            'token': 'Bearer ' + JSON.parse(token)
        };

        await axios.delete(endpoint, { headers });
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

export default RemoveToCart