import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import UserDetail from '../UserDetail/UserDetail';

const Item = ({ name, lastname, showUser }) => (
  <View style={styles.item}>
    <StatusBar style="auto" />
    <Pressable onPress={() => showUser()}>
      <Text style={{ fontSize: 24 }}>{name} {lastname}</Text>
    </Pressable>
  </View>
);

const UserList = (props) => {
  const ref = useRef();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("https://reqres.in/api/users");
      const users = await response.json();
      setUsers(users.data);
    }
    fetchUsers();
  }, [])

  return (
    <View style={[styles.container, props.style]}>
      <UserDetail ref={ref} />
      <Text style={{ fontSize: 32, marginHorizontal: 16, marginVertical: 16 }}>Lista de usuarios</Text>

      <FlatList
        data={users}
        renderItem={({ item }) => <Item name={item.first_name} lastname={item.last_name} showUser={() => ref.current.showUser(item.id)} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f6f4'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
});

export default UserList;
