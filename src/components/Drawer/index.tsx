import { useState, useEffect, useContext } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { headerItems } from '../../json/data';
import { useWindowScroll, useWindowSize } from '../../hooks';
import { listItemVariants, listVariants, drawerVariant } from '../../utils/motion';
import Icon from '../common/Icon';
import { DisplayModeContext } from '../../contexts/DisplayModeContext';

const Drawer = () => {
    const [open, setOpen] = useState(false);
    const scrollY = useWindowScroll();
    const controls = useAnimation();
    const { width: WindowWidth } = useWindowSize();
    const { isDarkMode, toggleDarkMode } = useContext(DisplayModeContext);

    useEffect(() => {
        if (open) {
            controls.start('visible');
            document.body.style.overflow = 'hidden';
        } else {
            controls.start('hidden');
            document.body.style.overflow = 'auto';
        }
    }, [open]);

    if (WindowWidth > 768) {
        if (open === true) {
            setOpen(false);
        }
        return null;
    }

    return (
        <>
            <div
                className={`md:hidden w-full p-[1.5rem] flex gap-[10px] items-center justify-end fixed top-0 z-[97] ${
                    scrollY !== 0 ? 'bg-transparent' : 'bg-transparent'
                }`}
            >
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
                <button type='button' className='' onClick={() => setOpen((prev) => !prev)}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#fff'
                        className='w-10 h-10'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                        />
                    </svg>
                </button>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key='drawer'
                        variants={drawerVariant}
                        initial='hidden'
                        exit='hidden'
                        animate={controls}
                        className='bg-[rgba(0,0,0,0.6)] shadow-xl w-[calc(100vw-4rem)] flex flex-col justify-between  max-w-[400px] fixed top-0 bottom-0 z-[300] right-[0]'
                    >
                        <div className='px-[5.4rem] pt-[1.7rem] flex justify-end'>
                            <button
                                type='button'
                                className='mb-[2.4rem] text-[4rem] text-right text-white'
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                &times;
                            </button>
                        </div>
                        <nav className='text-[1.4rem] px-[5.4rem] pb-[5vh]'>
                            <motion.ul
                                variants={listVariants}
                                initial='hidden'
                                animate='visible'
                                exit='hidden'
                                className='flex flex-col items-end'
                            >
                                {headerItems.slice(0, 4).map((item, index) => (
                                    <motion.li
                                        variants={listItemVariants}
                                        initial='hidden'
                                        animate='visible'
                                        exit='hidden'
                                        key={item.name}
                                        className={`text-[1.6rem] mb-[1.4rem] text-right ${
                                            index === 0 && 'text-white'
                                        }`}
                                    >
                                        <a
                                            className='text-white stroke-white fill-white'
                                            onClick={() => setOpen(false)}
                                            href={item.link}
                                        >
                                            {item.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
export default Drawer;
