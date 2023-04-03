import MyImage from '../../assets/images/me.jpg';
import CustomLink from '../common/CustomLink';

const AboutMe = () => (
    <div id='about' className='mx-auto text-center p-6 md:p-8 '>
        <h2 className='mb-4 text-red font-semibold text-md'>ABOUT</h2>
        <h2 className='mb-4 text-white dark:text-black text-2xl'>About Me</h2>
        <div className='w-[1100px] max-w-full m-auto grid grid-cols-1 gap-3'>
            <div className='flex items-center justify-center mb-6'>
                <img src={MyImage} alt='profile' className='rounded-full w-[120px]' />
            </div>

            <div className='flex flex-col items-center justify-start gap-y-3 max-w-[700px] m-auto '>
                <p className='text-white dark:text-black text-sm text-center mb-4'>
                    I&apos;m Waheed, a web developer with three years of experience. As a web
                    developer, I excel in creating responsive websites with a user-friendly design.
                    My skills also include bug fixing and backend development, ensuring seamless and
                    efficient website operation. I am passionate about my work and always strive to
                    deliver high-quality, functional websites to clients.
                </p>

                <CustomLink
                    download='Waheed Uddin Ahmed - Resume.pdf'
                    href='/files/Waheed Uddin Ahmed - Resume.pdf'
                    target='_blank'
                    variant='primary'
                >
                    My Resume
                </CustomLink>
            </div>
        </div>
    </div>
);

export default AboutMe;
