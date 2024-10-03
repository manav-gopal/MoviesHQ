import { type Movie } from "@/types/movieDataAPI.types";

async function fetchSearchData(searchQuery: string): Promise<Movie[]> {
  try {
    const response = await fetch(`/api/genai?query=${encodeURIComponent(searchQuery)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json() as Movie[];
    return data;
  } catch (error) {
    console.error('Error fetching search data:', error);
    return [];
  }
}

export default fetchSearchData;
