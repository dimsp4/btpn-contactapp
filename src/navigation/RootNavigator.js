import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { PATH } from "../util/constant/Path";
import Home from "../pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import ContactService from "../services/ContactService";
import { SIZE } from "../util/constant/Size";
import { ContactConf } from "../pages/contact/ContactConf";
import ContactAddForm from "../pages/contact/ContactAddForm";
import ContactUpdateForm from "../pages/contact/ContactUpdateForm";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const contacts = useSelector(state => state.contact.contacts)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={PATH.HOME}>
        <Stack.Screen
          name={PATH.HOME}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "tomato" },
            contentStyle: { marginHorizontal: SIZE.MARGIN_H },
            headerTitle: `My Contact (${contacts.length})`,
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        >
          {() => <Home service={() => ContactConf(ContactService)} />}
        </Stack.Screen>
        <Stack.Screen
          name={PATH.ADD_CONTACT}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "tomato" },
            headerTitle: "Add Contact",
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        >
          {() => <ContactAddForm service={() => ContactConf(ContactService)} />}
        </Stack.Screen>
        <Stack.Screen
          name={PATH.DETAIL}
          options={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "tomato" },
            headerTitle: "Update Contact",
            headerTitleAlign: "center",
            headerTintColor: "white",
          }}
        >
          {() => <ContactUpdateForm service={() => ContactConf(ContactService)} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
