'use client';

import { App } from '@/components/App';
import { Layout, Flex, Input } from 'antd';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <Layout>
      <Layout.Content className="max-w-screen-xl mx-auto h-screen w-full mt-12">
        <Flex gap="middle" vertical>
          <h1 className="text-2xl font-bold">Solace Advocates</h1>
          <App />
        </Flex>
      </Layout.Content>
    </Layout>
  );
}
