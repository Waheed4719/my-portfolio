import { FaGlobeAsia, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineBug, AiOutlineLineChart, AiOutlineGithub, AiOutlineLink } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';
import {
    SiUpwork,
    SiTypescript,
    SiNodedotjs,
    SiNextdotjs,
    SiExpress,
    SiReact,
    SiVuedotjs,
    SiNuxtdotjs
} from 'react-icons/si';

import {
    MdOutlineDesignServices,
    MdOutlineVisibility,
    MdOutlineVisibilityOff
} from 'react-icons/md';

type Props = {
    iconName: string;
    iconProps?: any;
};

type IconObj = {
    [s: string]: JSX.Element;
};
const GetIcon = ({ iconName, iconProps }: Props): JSX.Element => {
    const iconObj: IconObj = {
        react: <SiReact {...iconProps} />,
        typescript: <SiTypescript {...iconProps} />,
        node: <SiNodedotjs {...iconProps} />,
        vue: <SiVuedotjs {...iconProps} />,
        next: <SiNextdotjs {...iconProps} />,
        express: <SiExpress {...iconProps} />,
        globe: <FaGlobeAsia {...iconProps} />,
        bug: <AiOutlineBug {...iconProps} />,
        chart: <AiOutlineLineChart {...iconProps} />,
        design: <MdOutlineDesignServices {...iconProps} />,
        visibility: <MdOutlineVisibility {...iconProps} />,
        visibilityOff: <MdOutlineVisibilityOff {...iconProps} />,
        facebook: <FaFacebookF {...iconProps} />,
        linkedIn: <FaLinkedinIn {...iconProps} />,
        moon: <BsMoon {...iconProps} />,
        sun: <BsSun {...iconProps} />,
        github: <AiOutlineGithub {...iconProps} />,
        link: <AiOutlineLink {...iconProps} />,
        upwork: <SiUpwork {...iconProps} />,
        nuxt: <SiNuxtdotjs {...iconProps} />
    };
    return iconObj[iconName ?? 'react'];
};

export default GetIcon;
