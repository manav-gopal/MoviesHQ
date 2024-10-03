import { type NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const API_URL = process.env.TMDB_API_URL;

interface EndpointConfig {
  endpoint: string;
  params?: Record<string, string | number | boolean>;
}

const fetchData = async <T>(endpoint: string, params = {}, retries = 3): Promise<T> => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
      timeout: 10000,
    });
    return response.data as T;
  } catch (error) {
    if (error instanceof AxiosError && retries > 0) {
      console.log(`Retrying ${endpoint}. Attempts left: ${retries - 1}`);
      return fetchData(endpoint, params, retries - 1);
    }
    console.error(`Error in fetching ${endpoint}:`, error);
    throw error;
  }
};

const getEndpointConfig = (action: string, id: string | null): EndpointConfig => {
  const configs: Record<string, EndpointConfig> = {
    details: { endpoint: `movie/${id}` },
    credits: { endpoint: `movie/${id}/credits` },
    keywords: { endpoint: `movie/${id}/keywords` },
    recommendations: { endpoint: `movie/${id}/recommendations`, params: { page: 1, language: 'en-US' } },
    releaseDate: { endpoint: `movie/${id}/release_dates` },
    video: { endpoint: `movie/${id}/videos` },
    nowPlaying: { endpoint: "movie/now_playing" },
    trending: { endpoint: "trending/movie/week", params: { language: "en-US" } },
    reviews: { endpoint: `movie/${id}/reviews`, params: { language: "en-US" } },
    externalIds: { endpoint: `movie/${id}/external_ids` },
    images: { endpoint: `movie/${id}/images` },
  };

  return configs[action] ?? { endpoint: '' };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');

  if (!action) {
    return NextResponse.json({ error: 'Action is required' }, { status: 400 });
  }

  const { endpoint, params } = getEndpointConfig(action, id);

  if (!endpoint) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  try {
    const data = await fetchData(endpoint, params);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}