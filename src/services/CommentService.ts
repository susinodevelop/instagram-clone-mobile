import User from "@/interface/User";
import { useGET } from "./HttpService";

const API_URL = '/api/comments';

export const getAllComments = async (): Promise<Comment[]> => {
    return await useGET(API_URL)
}

export const getCommentUser = async (commentId: number): Promise<User[]> => {
    return await useGET(`${API_URL}/${commentId}/user`)
}