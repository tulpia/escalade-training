import useSWR from "swr";

export function useTractions(id) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/tractions${id ? `/${id}` : ""}`,
    fetcher
  );

  return {
    tractions: data,
    isLoading,
    isError: error,
  };
}
