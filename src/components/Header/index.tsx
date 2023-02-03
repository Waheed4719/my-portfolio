import { Link } from 'react-router-dom';
import HeaderItemList from './HeaderItemList';

const headerItems = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#home' },
  { name: 'Services', link: '#services' },
  { name: 'Stack', link: '#stack' },
  { name: 'Projects', link: '#projects' },
  // { name: 'Skills', link: '#home' },
  // { name: 'Blog', link: '#home' },
  { name: 'Contact', link: '#contact' }
];

export default () => (
  <div className='h-[80px] p-4 container mx-auto bg-[transparent] flex items-center'>
    <Link to='/' className='text-2xl text-white font-semibold'>
      Red<sup>tm</sup>
    </Link>
    <HeaderItemList items={headerItems} />
  </div>
);
