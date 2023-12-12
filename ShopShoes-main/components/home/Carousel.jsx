import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';


const Carousel = () => {
    const slides = [
        "https://s.zst.com.br/cms-assets/2020/12/como-escolher-tenis-de-corrida-4-.png",
        "https://i0.wp.com/prdnetshoes.wpcomstaging.com/wp-content/uploads/2022/10/evolucaotenisdecorrida20220908.jpeg?fit=1024%2C408&ssl=1",
        "https://i0.wp.com/prdnetshoes.wpcomstaging.com/wp-content/uploads/2021/06/tiposdetenis_netshoes_20210604.jpeg?fit=1256%2C500&ssl=1",
    ]
  return (
    <View style={styles.carouselContainer}>
      <SliderBox images={slides} 
        dotColor= {COLORS.primary}
        inactiveDotColor = {COLORS.secondary}
        ImageComponentStyle = {{borderRadius: 15, width: "92%", marginTop: 15}}
        autoplay
        circleLoop
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1, 
        alignItems: "center"
    }
})