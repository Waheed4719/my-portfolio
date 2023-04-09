import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

import CardGrid from './CardGrid';
import { stacks } from '../../json/data';

const MyStack = () => {
    const [ref, inView] = useInView();
    const controls = useAnimation();
    return (
        <div id='stack' ref={ref} className='mx-auto text-center p-6 md:p-8 '>
            <h2 className='mb-4 text-red font-semibold text-md'>STACK</h2>
            <h2 className='mb-4 text-black font-semibold dark:text-white text-2xl'>My Stack</h2>
            <p className='mb-6 text-black dark:text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>
                {`These are the technologies and tools I work with on a regular basis. This will give
                you an idea of my skillset and the technologies I'm comfortable using to develop
                websites or applications.`}
            </p>
            <div className='mb-12 bg-red h-0.5 w-10 mx-auto' />
            <CardGrid data={stacks} controls={controls} inView={inView} />
        </div>
    );
};

export default MyStack;
