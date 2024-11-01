'use client';

import { useGetAdvocates } from '@/api/getAdvocates';
import { Advocate } from '@/types';
import { Table, TableProps, Tag } from 'antd';

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
  const advocatesQuery = useGetAdvocates();

  console.log(advocatesQuery.data);
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
            let color = specialty.length > 5 ? 'geekblue' : 'green';
            if (specialty === 'loser') {
              color = 'volcano';
            }
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

  return <Table dataSource={advocatesQuery.data} columns={columns} />;
};
