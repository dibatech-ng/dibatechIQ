import React from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';

export default function FavouriteScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      {/* Main Content */}
      <ImageBackground
        source={require('../assets/bg2img.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.title}>Favourite</Text>

        {/* Dashed Divider */}
        <View style={styles.dashedLineContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.dash} />
          ))}
        </View>

        <Text style={styles.description}>
          Add favourite quiz to always go back to and check out
        </Text>
      </ImageBackground>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomBar}>
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F4C38',
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 24,
    paddingBottom: 80, // Makes room above the fixed bottom bar
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'Chewy',
    marginBottom: 10,
  },
  dashedLineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dash: {
    width: 50,
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    marginVertical: 1,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#0F4C38', // Optional: to match the screen bg and prevent transparency issues
  },
});
