type Props = { title: string; link: string };

const HeaderItem = ({ title, link }: Props) => (
    <a href={link}>
        <li className='text-white dark:text-black cursor-pointer hover:text-red'>{title}</li>
    </a>
);

export default HeaderItem;
