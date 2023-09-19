import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { onNavigate } from "../../navigation/RootNavigation";
import { PATH } from "../../util/constant/Path";

export default function ContactsTile({ item }) {
  const type = useSelector((state) => state.app.formType);

  const [isImageAvailable, setIsImageAvailable] = useState(true);

  useEffect(() => {
    if (item.photo && !isValidImageURL(item.photo)) {
      setIsImageAvailable(false);
    }
  }, []);

  const isValidImageURL = (url) => {
    const allowedExtensions = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
    return allowedExtensions.test(url);
  };

  const handleEditPress = async () => {
    onNavigate({
      routeName: PATH.DETAIL,
      params: item,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.circleImage}
          source={
            isImageAvailable
              ? { uri: item.photo }
              : require("../../../assets/noimage.jpg")
          }
        />
        <View>
          <Text style={styles.name}>
            {item.firstName + " " + item.lastName}
          </Text>
          <Text style={styles.age}>{item.age} years old</Text>
        </View>
      </View>
      <Pressable style={styles.roundButton} onPress={handleEditPress}>
        <Icon name="edit" size={20} color={"tomato"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  age: {
    fontSize: 16,
    color: "gray",
  },
  circleImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    marginRight: 15,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50 / 2,
  },
});
