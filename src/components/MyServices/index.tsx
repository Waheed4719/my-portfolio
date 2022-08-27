import React from 'react'
import CardGrid from './CardGrid'
import cardData from '../../json/cardData.json'

export default () => (
    <div className='container mx-auto text-center p-20'>
        <h2 className='mb-4 text-red font-semibold text-md'>SERVICES</h2>
        <h2 className='mb-4 text-white text-2xl'>My Services</h2>
        <p className='mb-6 text-white'>Esse irure consequat qui irure ullamco cupidatat magna do do. Minim laborum nulla esse et nulla in minim adipisicing. <br/> Minim laborum nulla esse et nulla in minim adipisicing.</p>
        <div className='mb-12 bg-red h-0.5 w-10 mx-auto'/>
        <CardGrid data={cardData}/>
    </div>
)

