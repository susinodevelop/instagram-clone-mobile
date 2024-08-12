import User from "@/interface/User";
import { useGET } from "./HttpService";
import DirectMessage from "@/interface/DirectMessage";
import Reel from "@/interface/Reel";
import Post from "@/interface/Post";
import Story from "@/interface/Story";
import Notification from "@/interface/Notification";

const API_URL = '/api/users';

export const getAllUsers = async (): Promise<User[]> => {
    return await useGET(API_URL)
}

export const getUser = async (userId: number): Promise<User> => {
    return await useGET(`${API_URL}/${userId}`)
}

export const getUserPosts = async (userId: number): Promise<Post[]> => {
    return await useGET(`${API_URL}/${userId}/posts`)
}

export const getUserStories = async (userId: number): Promise<Story[]> => {
    return await useGET(`${API_URL}/${userId}/stories`)
}

export const getUserNotifications = async (userId: number): Promise<Notification[]> => {
    return await useGET(`${API_URL}/${userId}/notifications`)
}

export const getUserMessages = async (userId: number): Promise<DirectMessage[]> => {
    return await useGET(`${API_URL}/${userId}/messages`)
}

export const getUserReels = async (userId: number): Promise<Reel[]> => {
    return await useGET(`${API_URL}/${userId}/reels`)
}