import { api } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AIQuery } from "../models/ai.model";

const getUserId= async () => {
    const niramoyUserId = await AsyncStorage.getItem("niramoy_user_id");
    return niramoyUserId;
}
const aiApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getLatest: builder.query<AIQuery, void>({
            query: async () => {
                const userId = await getUserId();
                console.log(userId);
                return {
                    url: `/latest/${userId}`,
                    method: "GET"
                };
            }
        })
    })
});

export const { useGetLatestQuery } = aiApi;