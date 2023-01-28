import HeaderItem from './HeaderItem';

type Props = {
  items: { name: string, link: string }[];
};

const HeaderItemList = ({ items }: Props) => (
  <ul className='ml-auto flex gap-10 space-between'>{items.map(item => <HeaderItem title={item.name} link={item.link} key={item.name} />)}</ul>
);

export default HeaderItemList;
