import {
  StackActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const onNavigate = ({ routeName, params = null, isReplace = null }) => {
  if (navigationRef.isReady()) {
    if (isReplace) {
      navigationRef.current.dispatch(StackActions.replace(routeName, params));
    } else {
      navigationRef.navigate(routeName, params);
    }
  }
};

export const onBackNavigate = () => {
  if (navigationRef.canGoBack) {
    navigationRef.current.goBack()
  }
}
