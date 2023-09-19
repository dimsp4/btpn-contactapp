import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function RecentTile({ image, firstName }) {
  const [isImageAvailable, setIsImageAvailable] = useState(true); 

  useEffect(() => {
    fetch(image)
      .then((response) => {
        if (!response.ok) {
          setIsImageAvailable(false);
        }
      })
      .catch((error) => {
        setIsImageAvailable(false);
      });
  }, [image]);

  return (
    <View style={styles.container}>
      {isImageAvailable ? (
        <Image
          style={styles.circleImage}
          source={{ uri: image }}
        />
      ) : (
        <Image
          style={styles.circleImage}
          source={require("../../../assets/noimage.jpg")} // Menampilkan gambar pengganti jika gambar tidak tersedia
        />
      )}
      <Text>{firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  circleImage: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
    marginBottom: 5,
  },
});
