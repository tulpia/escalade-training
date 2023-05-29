import useSWR from "swr";

export function useProblems(id) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/problems${id ? `/${id}` : ""}`,
    fetcher
  );

  return {
    problems: data,
    isLoading,
    isError: error,
  };
}
