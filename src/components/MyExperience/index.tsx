import { useContext } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import { DisplayModeContext } from '../../contexts/DisplayModeContext';
import 'react-vertical-timeline-component/style.min.css';
import useWindowSize from '../../hooks/useWindowSize';
import { experiences } from '../../json/data';
import SectionWrapper from '../SectionWrapper';

type ExperienceType = {
    title: string;
    company_name: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];
};

const ExperienceCard = ({
    experience,
    windowSize,
    index
}: {
    experience: ExperienceType;
    windowSize?: { height: number; width: number };
    index: number;
}) => (
    <VerticalTimelineElement
        contentStyle={{
            background: '#23263a',
            color: '#fff'
        }}
        contentArrowStyle={{ borderRight: '7px solid  #232631' }}
        date={experience.date}
        dateClassName={`${
            windowSize && windowSize?.width < 1200 ? 'dark:text-white' : 'dark:text-black'
        } ${index % 2 === 0 ? 'text-left' : 'text-right'} `}
        iconStyle={{ background: experience.iconBg }}
        icon={
            <div className='flex justify-center items-center w-full h-full'>
                <img
                    src={experience.icon}
                    alt={experience.company_name}
                    className='w-[60%] h-[60%] object-contain'
                />
            </div>
        }
    >
        <div>
            <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
            <p className='text-secondary text-[16px] font-semibold' style={{ margin: 0 }}>
                {experience.company_name}
            </p>
        </div>

        <ul className='mt-5 list-disc ml-5 space-y-2'>
            {experience.points.map((point, index) => (
                <li
                    key={`experience-point-${index}`}
                    className='text-white-100 text-left text-[14px] pl-1 tracking-wider'
                >
                    {point}
                </li>
            ))}
        </ul>
    </VerticalTimelineElement>
);

const Experience = () => {
    const { isDarkMode } = useContext(DisplayModeContext);
    const windowSize = useWindowSize();
    return (
        <>
            <h2 className='mb-4 text-red font-semibold text-md'>Experience</h2>
            <h2 className='mb-4 text-white dark:text-black text-2xl'>My Experiences</h2>

            <div className='mt-20 flex flex-col'>
                <VerticalTimeline lineColor={isDarkMode ? '#fff' : 'darkslategray'}>
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={`experience-${index}`}
                            experience={experience}
                            windowSize={windowSize}
                            index={index}
                        />
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
};
export default SectionWrapper(Experience, 'experience');
