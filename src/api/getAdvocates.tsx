import { useQuery } from '@tanstack/react-query';

export const getAdvocates = async () => {
  const response = await fetch('/api/advocates');
  const data = await response.json();
  return data.data;
};

export const useGetAdvocates = () =>
  useQuery({
    queryKey: ['advocates'],
    queryFn: getAdvocates,
  });
