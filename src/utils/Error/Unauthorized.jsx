import React from 'react';
import { Flex } from 'antd';

const Unauthorized = () => {
  return (
    <Flex justify='center' align='center' className='bg-white h-screen'>
      <h1>403 - Unauthorized</h1>
    </Flex>
  );
};

export default Unauthorized;