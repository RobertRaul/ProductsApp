import AsyncStorage from "@react-native-async-storage/async-storage";


export class MyStorageAdapter {


    static async getItemAdapter(key: string): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            return null;
        }
    }
    static async setItemAdapter(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            throw new Error(`Error setting item ${key} ${value}`)
        }
    }

    static async removeItemAdapter(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error)
            throw new Error(`Error removing item ${key}`)
        }
    }

}