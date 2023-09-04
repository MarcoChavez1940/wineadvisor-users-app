import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import UserList from './components/UserList/UserList';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <UserList style={{ marginTop: 80 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f6f4'
  },
});
