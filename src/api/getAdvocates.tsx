import { useQuery } from '@tanstack/react-query';

export const getAdvocates = async (search?: string) => {
  const response = await fetch(`/api/advocates?search=${search}`);
  const data = await response.json();
  return data.data;
};

export const useGetAdvocates = (search?: string) =>
  useQuery({
    queryKey: ['advocates', search],
    queryFn: () => getAdvocates(search),
  });
