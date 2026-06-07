import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import CardGrid from './CardGrid';
import { projects } from '../../json/data';

const MyProjects = () => {
    const [ref, inView] = useInView();
    const controls = useAnimation();

    return (
        <div
            id='projects'
            ref={ref}
            className='mx-auto text-center p-6 md:p-8 bg-[whitesmoke] dark:bg-transparent'
        >
            <h2 className='mb-4 text-red font-semibold text-md'>PROJECTS</h2>
            <h2 className='mb-4 text-black font-semiboldd dark:text-white text-2xl'>My Projects</h2>
            <p className='mb-6 text-black dark:text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>
                Where ideas become reality. Explore a selection of my favorite development projects, featuring real-world applications, experimental tools, and the technical stacks I use to build them.
            </p>
            <div className='mb-12 bg-red h-0.5 w-10 mx-auto' />
            <CardGrid data={projects} controls={controls} inView={inView} />
        </div>
    );
};

export default MyProjects;
