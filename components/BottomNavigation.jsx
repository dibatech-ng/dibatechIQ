import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Ionicons
          name={pathname === '/home' ? 'home' : 'home-outline'}
          size={36}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/favorites')}>
        <Ionicons
          name={pathname === '/favorites' ? 'heart' : 'heart-outline'}
          size={36}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/stats')}>
        <Feather
          name="bar-chart-2"
          size={36}
          color={pathname === '/stats' ? '#FFD600' : '#fff'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Ionicons
          name={pathname === '/settings' ? 'settings' : 'settings-outline'}
          size={36}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    backgroundColor: '#0C4A3A',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#0C4A3A',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
