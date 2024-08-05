import Story from "@/interface/Story";
import { useGET } from "./HttpService";

const API_URL = "/api/stories";

export const getAllStories = async (): Promise<Story[]> => {
  return await useGET(API_URL);
};

export const getStory = async (storyId: number): Promise<Story> => {
  return await useGET(`${API_URL}/${storyId}`);
};
