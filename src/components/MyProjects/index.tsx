import CardGrid from './CardGrid'
import { projects } from '../../json/data'

export default () => (
    <div className='container mx-auto text-center p-4 lg:p-20 '>
        <h2 className='mb-4 text-red font-semibold text-md'>PROJECTS</h2>
        <h2 className='mb-4 text-white text-2xl'>My Projects</h2>
        <p className='mb-6 text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>Esse irure consequat qui irure ullamco cupidatat magna do do. Minim laborum nulla esse et nulla in minim adipisicing. Minim laborum nulla esse et nulla in minim adipisicing.</p>
        <div className='mb-12 bg-red h-0.5 w-10 mx-auto' />
        <CardGrid data={projects} />
    </div>
)

