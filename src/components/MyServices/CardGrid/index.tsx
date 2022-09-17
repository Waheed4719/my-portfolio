import { motion, useAnimation } from 'framer-motion'
import React from 'react';
import { useInView } from "react-intersection-observer";
import Card from '../Card'

type Props = {
    data: { icon: string, title: string, description: string }[]
}
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};


export default ({ data }: Props) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);
    return (
        <motion.div
            ref={ref}
            animate={controls}
            variants={container}
            initial="hidden"
            className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid max-w-[1100px] mx-auto gap-4'>
            {data.map(item => <Card icon={item.icon} title={item.title} description={item.description} />)}
        </motion.div>
    )

} 
