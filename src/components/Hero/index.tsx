import { Player } from '@lottiefiles/react-lottie-player';
import Icon from '../common/Icon'
import CoderLottieFile from '../../json/coder-lottie.json';

const Hero = () => (
    <div className='h-[650px] w-full dark:bg-none bg-gradient-to-b from-[#1e2134] to-[#1a1b1e] flex items-center justify-center'>
        <div className='container mx-auto w-[1000px] flex flex-wrap justify-between max-w-full'>
            <div className='w-[450px] p-4'>
                <div className='flex gap-4 mb-10'>
                    <div className='items-center rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'>
                        <Icon iconName="facebook" iconProps={{ color: 'white' }} />
                    </div>
                    <div className='items-center rounded-full p-2 border-red border-2 hover:bg-red cursor-pointer'>
                        <Icon iconName="linkedIn" iconProps={{ color: 'white' }} />
                    </div>
                </div>
                <h1 className='text-white dark:text-black font-bold text-4xl mb-4'>I am Waheed Uddin Ahmed</h1>
                <p className='text-white dark:text-black font-thin mb-10'>{`A seasoned web developer with a passion for programming and gaming. With three years of experience, I specialize in designing and developing user-friendly websites. Let's connect and explore my work and growth in the field`}</p>
                <a
                    href="#projects"
                    type='button'
                    className='px-10 py-2 border-2 hover:bg-red bg-transparent border-red font-semibold text-sm text-white dark:text-black rounded-full shadow-sm'
                >
                    My Projects
                </a>
                <a
                    download='Waheed Uddin Ahmed - Resume.pdf'
                    href='/files/Waheed Uddin Ahmed - Resume.pdf'
                    target='_blank'
                    className='ml-2 px-10 py-2 border-2 hover:bg-red bg-transparent border-red font-semibold text-sm text-white dark:text-black rounded-full shadow-sm'
                >
                    My Resume
                </a>
            </div>
            <Player src={CoderLottieFile} className='w-[400px]' loop autoplay />
        </div>
    </div>
);

export default Hero;
