import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import CoderLottieFile from '../../json/coder-lottie.json';

const Hero = () => (
    <div className='h-[650px] w-full bg-[#23263a] flex items-center justify-center'>
        <div className='container mx-auto w-[1000px] flex flex-wrap justify-between max-w-full'>
            <div className='w-[450px] p-4'>
                <div className='flex gap-4 mb-10'>
                    <div className='items-center rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'>
                        <FaFacebookF size='20px' color='white' />
                    </div>
                    <div className='items-center rounded-full p-2 border-red border-2 hover:bg-red cursor-pointer'>
                        <FaLinkedinIn size='20px' color='white' />
                    </div>
                </div>
                <h1 className='text-white font-bold text-4xl mb-4'>I am Waheed Uddin Ahmed</h1>
                <p className='text-white font-thin mb-10'>{`Hi, I'm Waheed, professional web developer with a fair amount of experience in this field.`}</p>
                <button
                    type='button'
                    className='px-10 py-2 border-2 hover:bg-red bg-transparent border-red font-semibold text-sm text-white rounded-full shadow-sm'
                >
                    My Portfolio
                </button>
            </div>
            <Player src={CoderLottieFile} className='w-[400px]' loop autoplay />
        </div>
    </div>
);

export default Hero;
