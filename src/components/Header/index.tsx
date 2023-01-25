import React from 'react';
import { Link } from 'react-router-dom';

import HeaderItemList from './HeaderItemList';

const headerItems = ['Home', 'Stack', 'Projects', 'About', 'Skills', 'Blog', 'Contact'];

export default () => (
  <div className='h-[80px] p-4 container mx-auto bg-[transparent] flex items-center'>
    <Link to='/' className='text-2xl text-white font-semibold'>
      red<sup>tm</sup>
    </Link>
    <HeaderItemList items={headerItems} />
  </div>
);
