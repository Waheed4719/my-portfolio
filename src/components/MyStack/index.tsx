import { useInView } from "react-intersection-observer";
import { useAnimation } from 'framer-motion'

import CardGrid from './CardGrid'
import { stacks } from '../../json/data'

const MyStack = () => {
    const [ref, inView] = useInView();
    const controls = useAnimation();
    return (
        <div id="stack" className='container mx-auto text-center p-4 md:p-6 '>
            <h2 className='mb-4 text-red font-semibold text-md'>STACK</h2>
            <h2 className='mb-4 text-white text-2xl'>My Stack</h2>
            <p className='mb-6 text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>Esse irure consequat qui irure ullamco cupidatat magna do do. Minim laborum nulla esse et nulla in minim adipisicing. Minim laborum nulla esse et nulla in minim adipisicing.</p>
            <div ref={ref} className='mb-12 bg-red h-0.5 w-10 mx-auto' />
            <CardGrid data={stacks} controls={controls} inView={inView} />
        </div>
    )
}

export default MyStack