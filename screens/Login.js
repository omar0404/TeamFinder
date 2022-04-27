import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  AsyncStorage
} from "react-native";
import {
  Ionicons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome,
  SimpleLineIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { get } from "firebase/database";
import { usersRef } from "../service/firebase";

class Login extends Component {

  state = {
    password: "123",
    phone: "9803730793",
    loading: false,
    err: null
  };
  onNext = async () => {
    this.setState({ loading: true });
    const { password, phone } = this.state;
    let snapShot = await get(usersRef)
    let users = snapShot.val()
    let user = Object.values(users).filter(
      user => user.phone == phone && user.password == password
    );
    if (user.length) {
      this.props.onLoginSuccess(user[0])
      // this.props.loadUser(user[0].id);
      // AsyncStorage.setItem("userId", user[0].id);
    } else {
      Alert.alert("Phone number or password is invalid");
    }
    this.setState({ loading: false });
  };
  renderInput = (label, key) => {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", marginBottom: 7 }}>
          <Text style={{ fontWeight: "600", marginRight: 5 }}>
            {label}
          </Text>
        </View>
        <TextInput
          value={this.state[key]}
          keyboardType={"number-pad"}
          style={styles.input}
          placeholder={label}
          onChangeText={value => this.setState({ [key]: value })}
        />
      </View>
    )
  }
  render() {
    const { phone, password, loading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            backgroundColor: "#df0251",
            alignItems: "center",
            paddingHorizontal: 10,
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
        </View>
        <View
          style={{
            padding: 10
          }}
        >
          {this.renderInput("Phone Number", "phone")}
          {this.renderInput("Password", "password")}

          <TouchableOpacity
            disabled={!phone.length || !password.length}
            style={{
              backgroundColor:
                !phone.length || !password.length ? "gray" : "#35013d",
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
            onPress={this.onNext}
          >
            {loading ? (
              <ActivityIndicator
                style={{ marginLeft: 10 }}
                size="large"
                color={"white"}
              />
            ) : (
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export const styles = StyleSheet.create({
  input: {
    backgroundColor: "#efefef",
    height: 50,
    borderBottomColor: "#df0251",
    borderBottomWidth: 1
  }
});
export default Login
