import { Link } from 'react-router-dom';
import HeaderItemList from './HeaderItemList';
import { headerItems } from '../../json/data';

export default () => (
    <div className='h-[80px] p-4 mx-auto bg-[transparent] flex items-center justify-between gap-[20px]'>
        <Link to='/' className='text-2xl text-white font-semibold dark:text-black '>
            Red<sup>tm</sup>
        </Link>
        <HeaderItemList items={headerItems} />
    </div>
);
