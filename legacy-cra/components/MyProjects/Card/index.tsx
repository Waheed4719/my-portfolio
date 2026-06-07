import { motion } from 'framer-motion';
import Icon from '../../common/Icon';

type Props = {
    image: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    github?: string;
};
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default ({ image, title, description, technologies, link, github }: Props) => (
    <motion.div
        variants={item}
        onClick={() => link && window.open(link, '_blank', 'noreferrer')}
        className={`bg-[#23263a] flex flex-col  hover:bg-red hover:text-white rounded-md shadow-md text-left group cursor-pointer relative overflow-hidden ${
            !link && 'cursor-not-allowed'
        }`}
    >
        <div className='h-[172px] object-contain relative flex items-center justify-center overflow-hidden'>
            <img
                src={image}
                className='h-[172px] w-full absolute object-center top-0 left-0 bottom-0 right-0 object-cover blur-md'
                alt={`${title}-blur`}
            />
            <img src={image} className='h-[172px] object-contain relative z-1' alt={`${title}`} />
        </div>
        <div className='hidden absolute top-[10px] right-[10px] p-2 group-hover:block group-hover:bg-red rounded-md'>
            <Icon iconName={`${link ? 'visibility' : 'visibilityOff'}`} />
        </div>
        {github && (
            <a
                className='hidden absolute top-[10px] right-[50px] p-2 items-center justify-center group-hover:flex group-hover:bg-red rounded-md'
                onClick={(e) => e.stopPropagation()}
                href={github}
            >
                <Icon iconName='github' />{' '}
            </a>
        )}
        <div className='p-4 flex-1 flex flex-col'>
            <h4 className='mb-4 text-white font-semibold'>{title}</h4>
            <p className='mb-4 text-white text-sm flex-1'>{description}</p>
            <div className='flex gap-2 mt-auto align-bottom'>
                {technologies.map((tech) => (
                    <span className='text-xs text-gray-300 group-hover:text-gray-100' key={tech}>
                        #{tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);
