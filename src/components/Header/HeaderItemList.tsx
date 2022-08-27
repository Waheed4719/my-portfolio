import React from 'react';
import HeaderItem from './HeaderItem';

type Props = {
  items: string[];
};

const HeaderItemList = ({ items }: Props) => (
  <ul className='ml-auto flex gap-10 space-between'>{items.map(item => <HeaderItem title={item} key={item} />)}</ul>
);

export default HeaderItemList;
