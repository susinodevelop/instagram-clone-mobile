import DirectMessage from "@/interface/DirectMessage";
import { useGET } from "./HttpService";

const API_URL = '/api/messages';

export const getAllMessages = async (): Promise<DirectMessage[]> => {
    return await useGET(API_URL)
}
