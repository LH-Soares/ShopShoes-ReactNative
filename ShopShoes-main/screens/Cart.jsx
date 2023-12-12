import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cart.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import fetchCart from "../hook/fetchCart";
import CartTile from "../components/cart/cartTile";
import { Button } from "../components";
import RemoveToCart from "../hook/removeToCart"; 

const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selectedItems, setSelectedItems] = useState({});

  const handleCheckoutPress = async () => {
    const selectedIds = Object.keys(selectedItems);

    // Implemente a lógica para excluir itens selecionados
    for (const itemId of selectedIds) {
      try {
        await RemoveToCart(itemId);
        console.log(`Item ${itemId} removido do carrinho com sucesso!`);
      } catch (error) {
        console.error(`Erro ao remover item ${itemId} do carrinho:`, error.message);
      }
    }

    // Limpa a seleção após a exclusão
    setSelectedItems({});
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Cart</Text>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartTile
              item={item}
              onPress={() => {
                setSelectedItems((prevSelectedItems) => ({
                  ...prevSelectedItems,
                  [item._id]: !prevSelectedItems[item._id],
                }));
              }}
              select={selectedItems[item._id]}
            />
          )}
        />
      )}

      {Object.keys(selectedItems).length === 0 ? (
        <View></View>
      ) : (
        <Button
          title={'Deletar'}
          isValid={true} // Você pode ajustar isso com base na lógica desejada
          onPress={handleCheckoutPress}
          
        />
      )}
   
    </SafeAreaView>
  );
};

export default Cart;


