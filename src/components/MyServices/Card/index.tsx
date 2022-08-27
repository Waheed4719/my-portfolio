import React from 'react'

type Props = {
    icon?: string;
    title: string;
    description: string;
}

export default ({ icon, title, description }: Props) => (
    <div className='p-8 bg-[#23263a] rounded-md shadow-md text-left'>
        <h4 className='mb-4 text-white font-semibold'>{title}</h4>
        <p className='mb-4 text-white text-sm'>{description}</p>
    </div>
)
