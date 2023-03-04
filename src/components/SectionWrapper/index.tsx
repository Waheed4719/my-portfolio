import { motion } from 'framer-motion';

import { staggerContainer } from '../../utils/motion';

const StarWrapper = (Component: React.FC, idName: string) => () =>
    (
        <motion.section
            variants={staggerContainer()}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true, amount: 0.25 }}
            className=' dark:bg-[whitesmoke] relative z-0  mx-auto text-center p-6 md:p-8'
        >
            <span className='hash-span' id={idName}>
                &nbsp;
            </span>

            <Component />
        </motion.section>
    );

export default StarWrapper;
