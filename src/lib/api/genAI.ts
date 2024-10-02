import { GoogleGenerativeAI } from "@google/generative-ai";
import axios, { AxiosError, type AxiosResponse } from "axios";
import geminiPrompt from "@/lib/constants/geminiPrompt";
import { type MovieListResponse } from "@/types/movieDataAPI.types";

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchSearchData(searchQuery: string) {

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = geminiPrompt(searchQuery);

  try {
    const text = (await model.generateContent(prompt)).response.text();
    console.log("GenAI response : ", text);

    const options = {
      method: "GET",
      url: `${text}`,
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
      },
    };
    const response: AxiosResponse<MovieListResponse> =
      await axios.request<MovieListResponse>(options);
    // console.log("gemini res", response);
    return response.data.results;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Failed to fetch data:", error.response?.data);
    } else {
      console.error("Failed to fetch data:", error);
    }
    return [];
  }
}

export default fetchSearchData;
