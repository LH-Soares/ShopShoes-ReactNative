import { TouchableOpacity, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../constants';
import { OrdersTile } from '../components';
import styles from './cart.style';
import fetchOrders from '../hook/fetchOrders';


const Orders = ({navigation}) => {
  const {data, loading, error, refetch} = fetchOrders();
console.log(data);
  return (
   <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Orders</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <OrdersTile
              item={item}
              
            />
          )}
        />
      )}
   </SafeAreaView>
  )
}

export default Orders

