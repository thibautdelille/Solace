import { Advocate } from '@/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TablePaginationConfig } from 'antd';

type GetAdvocatesParams = {
  search?: string;
  page?: number;
  pageSize?: number;
};

type GetAdvocatesResponse = {
  data: Advocate[];
  total: number;
  page: number;
  pageSize: number;
};

export const getAdvocates = async ({
  search,
  page,
  pageSize,
}: GetAdvocatesParams): Promise<GetAdvocatesResponse> => {
  const response = await fetch(
    `/api/advocates?search=${search}&page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  return data;
};

export const useGetAdvocates = (params: GetAdvocatesParams) =>
  useQuery({
    queryKey: ['advocates', params],
    queryFn: () => getAdvocates(params),
  });
