import { Player } from '@lottiefiles/react-lottie-player';
import Icon from '../common/Icon';
import CustomLink from '../common/CustomLink';
import CoderLottieFile from '../../json/coder-lottie.json';

const Hero = () => (
    <div className='min-h-[fit-content] md:h-[650px] sm:pt-[40px] md:pt-[0px] w-full dark:bg-none bg-gradient-to-b from-[#1e2134] to-[#1a1b1e] dark:bg-[whitesmoke] flex items-center justify-center'>
        <div className='mx-auto w-[1000px] flex flex-wrap justify-center md:justify-between max-w-full'>
            <div className='w-[450px] p-4'>
                <div className='flex gap-4 mb-10'>
                    <div className='ease-in-out duration-300 items-center rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'>
                        <Icon
                            iconName='facebook'
                            iconProps={{
                                className:
                                    'ease-in-out duration-300 text-white dark:text-black dark:group-hover:text-white'
                            }}
                        />
                    </div>
                    <div className='items-center ease-in-out duration-300 rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'>
                        <Icon
                            iconName='linkedIn'
                            iconProps={{
                                className:
                                    'ease-in-out duration-300 text-white dark:text-black dark:group-hover:text-white'
                            }}
                        />
                    </div>
                </div>
                <h1 className='text-white dark:text-black font-bold text-4xl mb-4'>
                    I am Waheed Uddin Ahmed
                </h1>
                <p className='text-white dark:text-black font-light mb-10'>{`A seasoned web developer with a passion for programming and gaming. With three years of experience, I specialize in designing and developing user-friendly websites. Let's connect and explore my work and growth in the field`}</p>
                <CustomLink href='#projects' type='button' variant='primary'>
                    My Projects
                </CustomLink>
                <CustomLink
                    download='Waheed Uddin Ahmed - Resume.pdf'
                    href='/files/Waheed Uddin Ahmed - Resume.pdf'
                    target='_blank'
                    className='ml-2'
                    variant='primary'
                >
                    My Resume
                </CustomLink>
            </div>
            <Player src={CoderLottieFile} className='w-[400px]' loop autoplay />
        </div>
    </div>
);

export default Hero;
