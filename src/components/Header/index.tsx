import React from 'react';
import { Link } from 'react-router-dom';

import HeaderItemList from './HeaderItemList';

const headerItems = ['Home', 'Services', 'About', 'Skills', 'Portfolio', 'Blog', 'Contact'];

export default () => (
  <div className='h-[80px] p-4 container mx-auto bg-[transparent] flex items-center'>
    <Link to='/' className='text-2xl text-white font-semibold'>
      ami.ke
    </Link>
    <HeaderItemList items={headerItems} />
  </div>
);
