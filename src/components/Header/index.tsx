import { Link } from 'react-router-dom';
import HeaderItemList from './HeaderItemList';

const headerItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Services', link: '#services' },
    { name: 'Stack', link: '#stack' },
    { name: 'Projects', link: '#projects' },
    { name: 'Contact', link: '#contact' }
];

export default () => (
    <div className='h-[80px] p-6 mx-auto bg-[transparent] flex items-center justify-between gap-[20px]'>
        <Link to='/' className='text-2xl text-white font-semibold dark:text-black '>
            Red<sup>tm</sup>
        </Link>
        <HeaderItemList items={headerItems} />
    </div>
);
