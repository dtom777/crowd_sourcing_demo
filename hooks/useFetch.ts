import useSWR from 'swr';

export const useFetch = (url: string) => {
  const fetcher = async (arg: RequestInfo) => {
    const res = await fetch(arg);

    if (!res.ok) {
      const error = res.json();
      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};
