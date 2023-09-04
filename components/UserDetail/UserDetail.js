import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Modal, Image, Button } from 'react-native';
import background from '../../assets/background.jpeg';

const UserDetail = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState()

  useImperativeHandle(ref, () => ({
    showUser(userId) {
      setUser({ id: userId });
      setModalVisible(true);
    }
  }));

  useEffect(() => {
    let userSelected = user;
    async function fetchUser() {
      const response = await fetch(`https://reqres.in/api/users/${userSelected.id}`);
      const user = await response.json();
      setUser(user.data);
    }
    if (modalVisible) {
      fetchUser();
    }
  }, [modalVisible])

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={{ flex: 1, backgroundColor: "#f9f6f4" }}>
        <StatusBar style="auto" />
        <View>
          <View>
            <Image source={background} style={{ height: 380 }} />

            <Image source={{ uri: user?.avatar }} style={{ height: 200, width: 200, borderRadius: 200, position: 'absolute', alignSelf: 'center', top: 50 }} />
            <Text style={{ fontSize: 32, position: 'absolute', alignSelf: 'center', top: 270 }}>{user?.first_name} {user?.last_name}</Text>
            <Text style={{ fontSize: 18, position: 'absolute', alignSelf: 'center', top: 315 }}>{user?.email}</Text>

            <Button
              onPress={() => setModalVisible(false)}
              title="Regresar"
              color="#841584"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default UserDetail;