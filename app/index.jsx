import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { useFonts as useChewy, Chewy_400Regular } from '@expo-google-fonts/chewy';

export default function IntroScreen() {
  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  const [chewyLoaded] = useChewy({
    Chewy_400Regular,
  });

 if (!montserratLoaded || !chewyLoaded) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D4C3F' }}>
      <Text style={{ color: '#fff', fontSize: 18 }}>Loading fonts...</Text>
    </View>
  );
}


  return (
    <ImageBackground
      source={require('../assets/bgimg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <Text style={styles.welcome}>Welcome Techies</Text>

      <View style={styles.textWrapper}>
        <Text style={styles.boldText}>Sharpen your skills</Text>
        <Text style={styles.boldText}>Challenge your mind</Text>
        <Text style={styles.boldText}>Rise higer</Text>

        <Text style={styles.normalText}>
          DibaTech IQ is your daily tech trivia for sharper thinking and faster skills.
        </Text>

        <Text style={styles.normalText}>One question at a time.{'\n'}Ready to grow?</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={['#D3E734', '#3DBE3D']}
          style={styles.button}
        >
          <Text style={styles.buttonText}>START →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  welcome: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Chewy_400Regular',
    alignSelf: 'center',
  },
  textWrapper: {
    marginTop: 20,
  },
  boldText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 6,
  },
  normalText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 28,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 14,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: 80,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
  },
});
