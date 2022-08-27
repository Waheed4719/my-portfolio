import React from 'react'
import Card from '../Card'

type Props = {
    data: { title: string, description: string }[]
}

export default ({ data }: Props) => (
    <div className='grid-cols-3 grid max-w-[1100px] mx-auto gap-4'>{data.map(item => <Card title={item.title} description={item.description} />)}</div>
)
