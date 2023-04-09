import { Player } from '@lottiefiles/react-lottie-player';
import Icon from '../common/Icon';
import CustomLink from '../common/CustomLink';
import CoderLottieFile from '../../json/coder-lottie.json';

const Hero = () => (
    <div className='p-6 min-h-[fit-content] lg:h-[650px] sm:pt-[40px] md:pt-[0px] w-full bg-none dark:bg-gradient-to-b dark:from-[#1e2134] dark:to-[#1a1b1e] bg-[whitesmoke] flex items-center justify-center'>
        <div className='mx-auto w-[1000px] flex flex-wrap justify-center md:justify-between max-w-full'>
            <div className='w-[450px] md:p-4'>
                <div className='flex gap-4 mb-10'>
                    <a
                        href='https://www.facebook.com/wahid.ahmed.96/'
                        className='ease-in-out duration-300 items-center rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'
                    >
                        <Icon
                            iconName='facebook'
                            iconProps={{
                                className:
                                    'ease-in-out duration-300 text-black dark:text-white group-hover:text-white'
                            }}
                        />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/waheed-uddin-ahmed-09143a1b2/'
                        className='items-center ease-in-out duration-300 rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'
                    >
                        <Icon
                            iconName='linkedIn'
                            iconProps={{
                                className:
                                    'ease-in-out duration-300 text-black dark:text-white group-hover:text-white'
                            }}
                        />
                    </a>

                    <a
                        href='https://github.com/Waheed4719'
                        className='items-center ease-in-out duration-300 rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'
                    >
                        <Icon
                            iconName='github'
                            iconProps={{
                                className:
                                    'ease-in-out duration-300 text-black dark:text-white group-hover:text-white'
                            }}
                        />
                    </a>
                    <a
                        href='https://www.upwork.com/freelancers/~015a4a1d12148116c9'
                        className='items-center ease-in-out duration-300 rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'
                    >
                        <Icon
                            iconName='upwork'
                            iconProps={{
                                className:
                                    'ease-in-out duration-300 text-black dark:text-white group-hover:text-white'
                            }}
                        />
                    </a>
                </div>
                <h1 className='text-black dark:text-white font-bold text-4xl mb-4'>
                    I am Waheed Uddin Ahmed
                </h1>
                <p className='text-black dark:text-white font-light mb-10'>{`A seasoned web developer with a passion for programming and gaming. With over three years of experience, I specialize in designing and developing user-friendly websites. Let's connect and explore my work and growth in the field`}</p>
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
            <Player
                src={CoderLottieFile}
                className='w-[350px] md:w-[400px] max-w-full'
                loop
                autoplay
            />
        </div>
    </div>
);

export default Hero;
