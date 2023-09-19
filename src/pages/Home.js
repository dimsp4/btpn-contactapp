import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../store/ContactReducer";
import Icon from "react-native-vector-icons/Feather";
import RecentTile from "./components/RecentTile";
import ContactsTile from "./components/ContactsTile";
import { onNavigate } from "../navigation/RootNavigation";
import { PATH } from "../util/constant/Path";
import { SIZE } from "../util/constant/Size";

export default function Home({ service }) {
  const dispatch = useDispatch();

  const [searchInput, setSearch] = useState("");

  const { onLoadContacts } = service();

  const loadContacts = async () => {
    const contacts = await onLoadContacts();
    dispatch(setContacts(contacts.data.data));
  };

  const contacts = useSelector((state) => state.contact.contacts);
  const recent = useSelector((state) => state.contact.recent);
  const loading = useSelector(state => state.app.isLoading)

  useEffect(() => {
    loadContacts();
  }, []);

  const handleFloatingButtonPress = () => {
    onNavigate({ routeName: PATH.ADD_CONTACT });
  };

  const filterContacts = (contacts, query) => {
    return contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {recent[0] ? (
          <View style={styles.recent}>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10, color: 'tomato' }}
            >
              Recent
            </Text>
            <FlatList
              scrollEnabled={true}
              horizontal={true}
              data={recent}
              renderItem={({ item, index }) => (
                <RecentTile
                  key={index}
                  image={item.data.photo}
                  firstName={item.data.firstName}
                />
              )}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "tomato" }}>
              Welcome to Contact App
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "tomato",
                opacity: 0.5,
              }}
            >
              add your contact easily
            </Text>
          </View>
        )}
        <View style={styles.searchSection}>
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color="tomato"
          />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={setSearch}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={filterContacts(contacts, searchInput)}
          renderItem={({ item, index }) => (
            <ContactsTile key={index} item={item} />
          )}
          ListEmptyComponent={() => {!loading && <Text>No data..</Text>}}
        />
      </View>
      <Pressable
        onPress={handleFloatingButtonPress}
        style={styles.floatingButton}
      >
        <Icon name="plus" size={25} color={"white"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "space-between",
  },
  content: {
    flex: 2,
    justifyContent: "center",
    alignItems: "stretch",
  },
  recent: {
    marginTop: 20,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "tomato",
  },
  searchIcon: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingEnd: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    borderRadius: 20,
    backgroundColor: "white",
    color: "tomato",
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 0,
    left: 0,
    width: "100%",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
});
