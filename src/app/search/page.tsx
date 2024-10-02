import SearchClient from "./Search";

export default function Search({ searchParams }: { searchParams: { q: string } }) {
  return <SearchClient query={searchParams.q} />;
}
