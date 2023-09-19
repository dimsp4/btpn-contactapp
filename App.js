import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store/store";
import DepProvider from "./src/context/DependencyContext";
import apiClient from "./src/services/ApiClient";
import AppNavigation from "./src/navigation/RootNavigator";
import { Loading } from "./src/util/components/Loading";
import { popError } from "./src/store/AppReducer";
import ErrorPopup from "./src/util/components/ErrorPopup";

export default function App() {
  return (
    <Provider store={store}>
      <DepProvider services={{ apiClient }}>
        <View style={styles.container}>
          <AppNavigation />
          <Loading />
          <ErrorPopup />
        </View>
      </DepProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
