'use client';

import { useGetAdvocates } from '@/api/getAdvocates';
import { SPECIALTY_TO_COLOR } from '@/constants';
import { Advocate } from '@/types';
import { GetProp, Input, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';

type TablePaginationConfig = Exclude<
  GetProp<TableProps, 'pagination'>,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
}

export const AdvocateList = () => {
  const [search, setSearch] = useState('');
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const advocatesQuery = useGetAdvocates({
    search,
    page: tableParams.pagination?.current,
    pageSize: tableParams.pagination?.pageSize,
  });

  useEffect(() => {
    if (advocatesQuery.data) {
      setTableParams({
        pagination: {
          ...tableParams.pagination,
          total: advocatesQuery.data.total,
        },
      });
    }
  }, [advocatesQuery.data]);

  const handleTableChange = (props: TablePaginationConfig) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        ...props,
      },
    });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns: TableProps<Advocate>['columns'] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: 'Specialties',
      key: 'specialties',
      dataIndex: 'specialties',
      render: (_, { specialties }) => (
        <>
          {specialties.map((specialty) => {
            const color = SPECIALTY_TO_COLOR.find(
              ({ specialty: s }) => s === specialty
            )?.color;
            return (
              <Tag color={color} key={specialty}>
                {specialty.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Years of Experience',
      dataIndex: 'yearsOfExperience',
      key: 'yearsOfExperience',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  return (
    <>
      <Input.Search placeholder="Search" onChange={onSearch} />
      <Table
        dataSource={advocatesQuery.data?.data}
        columns={columns}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </>
  );
};
