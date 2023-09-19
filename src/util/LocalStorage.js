import AsyncStorage from "@react-native-async-storage/async-storage"

const LocalStorage = () => {
    const setData = async(key,value) => {
        try {
            await AsyncStorage.setItem(key,value)
        } catch (error) {
            throw error
        }
    }

    const getData = async(key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value != null) {
                return value
            }
        } catch (error) {
            throw error
        }
    }

    const removeData = async(key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            throw error
        }
    }

    return {
        setData,
        getData,
        removeData
    }
}

export default LocalStorage