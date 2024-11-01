'use client';

import { useGetAdvocates } from '@/api/getAdvocates';
import { SPECIALTY_TO_COLOR } from '@/constants';
import { Advocate } from '@/types';
import { Input, Table, TableProps, Tag } from 'antd';
import { useState } from 'react';

interface DataType {
  key: string;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
}

export const AdvocateList = () => {
  const [search, setSearch] = useState('');
  const advocatesQuery = useGetAdvocates(search);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
      <Table dataSource={advocatesQuery.data} columns={columns} />
    </>
  );
};
