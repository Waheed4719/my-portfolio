import Icon from '../common/Icon';
import ContactForm from './Form';

const Contact = () => (
    <div id='contact' className='mx-auto text-center p-6 md:p-8 '>
        <h2 className='mb-4 text-red font-semibold text-md'>CONTACT</h2>
        <h2 className='mb-4 text-black dark:text-white font-semibold text-2xl'>My Contact</h2>
        <p className='mb-6 text-black dark:text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>
            Esse irure consequat qui irure ullamco cupidatat magna do do. Minim laborum nulla esse
            et nulla in minim adipisicing. Minim laborum nulla esse et nulla in minim adipisicing.
        </p>
        <div className='mb-12 bg-red h-0.5 w-10 mx-auto' />
        <div className='mb-12 grid grid-cols-1 w-full max-w-[1100px] m-auto gap-y-6'>
            <ContactForm />
            <div className='col-span-1 text-black flex dark:text-white font-semibold  place-items-center justify-center relative gap-x-2'>
                <span className='h-[2px] w-[20px] bg-black dark:bg-white ' /> OR{' '}
                <span className='h-[2px] w-[20px] bg-black dark:bg-white' />
            </div>

            <div className='flex gap-4 mb-10 place-items-center justify-center '>
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
                <a
                    href='https://www.facebook.com/wahid.ahmed.96/'
                    className='items-center ease-in-out duration-300 rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'
                >
                    <Icon
                        iconName='facebook'
                        iconProps={{
                            className:
                                'ease-in-out duration-300 text-black dark:text-white group-hover:text-white'
                        }}
                    />
                </a>
            </div>
        </div>
    </div>
);

export default Contact;
