import React from 'react';
import { SiTypescript, SiNodedotjs, SiNextdotjs, SiExpress, SiReact, SiVuedotjs } from 'react-icons/si'

type Props = {
    iconName: string;
    iconProps?: any;
};

type IconObj = {
    [s: string]: JSX.Element
}
const GetIcon = ({ iconName, iconProps }: Props): JSX.Element => {
    const iconObj: IconObj = {
        "react": <SiReact {...iconProps} />,
        "typescript": <SiTypescript  {...iconProps}/>,
        "node": <SiNodedotjs  {...iconProps}/>,
        "vue": <SiVuedotjs  {...iconProps}/>,
        "next": <SiNextdotjs  {...iconProps}/>,
        "express": <SiExpress  {...iconProps}/>
    }
    return iconObj[iconName ?? 'react']
}

export default GetIcon;
