import { motion } from 'framer-motion'
import Icon from '../../common/GetIcon'

type Props = {
    icon: string;
    title: string;
    description: string;
}
const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
export default ({ icon, title, description }: Props) => (
    <motion.div variants={item} className='p-8 bg-[#23263a] hover:bg-red hover:text-white rounded-md shadow-md text-left group cursor-pointer'>
        <Icon iconName={icon} iconProps={{ size: '40px', className: `text-red group-hover:text-white mb-3` }} />
        <h4 className='mb-4 text-white font-semibold'>{title}</h4>
        <p className='mb-4 text-white text-sm'>{description}</p>
    </motion.div>
)
