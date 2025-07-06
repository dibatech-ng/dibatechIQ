import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SelectCategoryScreen() {
  const router = useRouter();

  const categories = [
    { key: 'html', label: 'HTML' },
    { key: 'css', label: 'CSS' },
    { key: 'javascript', label: 'JavaScript' },
    { key: 'react', label: 'React.js' },
    { key: 'node', label: 'Node.js' },
    { key: 'dotnet', label: '.NET' },
  ];

  const handleSelect = (key) => {
    router.push({ pathname: '/QuizScreen', params: { category: key } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Category</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.key} style={styles.button} onPress={() => handleSelect(cat.key)}>
            <Text style={styles.buttonText}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4A3A',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  button: {
    backgroundColor: '#0D3628',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginBottom: 20,
    width: 250,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    color: '#00FF80',
    fontWeight: 'bold',
  },
});
