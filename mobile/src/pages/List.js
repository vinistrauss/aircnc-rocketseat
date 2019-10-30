import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import SpotList from "../components/SpotList";
import socketio from "socket.io-client";
import logo from "../assets/logo.png";

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.15.13:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storegedtechs => {
      const techsArray = storegedtechs.split(",").map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  async function handleLogin() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogin}>
        <Image style={styles.logo} source={logo} onPress={handleLogin} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
