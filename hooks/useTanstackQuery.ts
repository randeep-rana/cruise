import { UseQueryOptions, useQuery } from "@tanstack/react-query"

const useTanstackQuery = <T = any>(options: UseQueryOptions) => {
  const { data, ...rest } = useQuery(options)
  return { data: data ? ((data as any)?.response?.data as T) : undefined, ...rest }
}

export default useTanstackQuery
