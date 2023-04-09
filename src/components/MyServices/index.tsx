import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import CardGrid from './CardGrid';
import { services } from '../../json/data';

const MyServices = () => {
    const [ref, inView] = useInView();
    const controls = useAnimation();
    return (
        <div
            id='services'
            ref={ref}
            className='mx-auto text-center p-6 md:p-8 bg-[whitesmoke] dark:bg-transparent'
        >
            <h2 className='mb-4 text-red font-semibold text-md'>SERVICES</h2>
            <h2 className='mb-4 text-black font-semibold dark:text-white text-2xl'>My Services</h2>
            <p className='mb-6 text-black dark:text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>
                I offer comprehensive website development services, including building, design,
                optimization and bug fixing. Let me help you create or improve your online presence.
            </p>
            <div className='mb-12 bg-red h-0.5 w-10 mx-auto' />
            <CardGrid data={services} controls={controls} inView={inView} />
        </div>
    );
};

export default MyServices;
