import HeaderItem from './HeaderItem';
import Icon from '../common/Icon';
import { useContext } from 'react';
import { DisplayModeContext } from '../../contexts/DisplayModeContext';

type Props = {
    items: { name: string; link: string }[];
};

const HeaderItemList = ({ items }: Props) => {
    const { isDarkMode, toggleDarkMode } = useContext(DisplayModeContext);
    return (
        <ul className='ml-autogap-10 gap-[20px] space-between items-center flex'>
            {' '}
            <div
                role='presentation'
                className='ease-in-out duration-300 items-center rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'
                onClick={toggleDarkMode}
            >
                <Icon
                    iconName={isDarkMode ? 'moon' : 'sun'}
                    iconProps={{
                        className:
                            'ease-in-out duration-300 text-white dark:text-black dark:group-hover:text-white'
                    }}
                />
            </div>
            <div className=' hidden lg:flex gap-[20px]'>
                {items.map((item) => (
                    <HeaderItem title={item.name} link={item.link} key={item.name} />
                ))}
            </div>
        </ul>
    );
};

export default HeaderItemList;
