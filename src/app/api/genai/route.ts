import { type NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios, { AxiosError } from "axios";
import geminiPrompt from "@/lib/constants/geminiPrompt";
import { env } from "@/env.js";
import { type MovieListResponse } from "@/types/movieDataAPI.types";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const API_KEY = env.TMDB_API_KEY;
// const API_URL = env.TMDB_API_URL;

const fetchData = async <T>(url: string, params = {}, retries = 3): Promise<T> => {
  try {
    const response = await axios.get(url, {
      params: { api_key: API_KEY, ...params },
      timeout: 10000,
    });
    return response.data as T;
  } catch (error) {
    if (error instanceof AxiosError && retries > 0) {
      console.log(`Retrying ${url}. Attempts left: ${retries - 1}`);
      return fetchData(url, params, retries - 1);
    }
    console.error(`Error in fetching ${url}:`, error);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get('query');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = geminiPrompt(searchQuery);
    const result = await model.generateContent(prompt);
    const generatedUrl = result.response.text();

    console.log("GenAI response:", generatedUrl);

    const data = await fetchData<MovieListResponse>(generatedUrl, { language: "en-US", page: 1 });
    return NextResponse.json(data.results);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}