import { useQuery } from 'react-query'
import { useEffect } from 'react'

export function useGetQueryWithAutoRefetch<T>(
	requestName: string,
	action: () => Promise<T>
): T | undefined {
	const { data, isSuccess, refetch } = useQuery<T>(
		'auto refetch ' + requestName,
		action
	)
	useEffect(() => {
		if (!isSuccess) {
			refetch()
		}
	}, [data])
	return data
}
