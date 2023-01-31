import Icon from '../common/Icon'

const Contact = () => (
  <div className='container mx-auto text-center p-6 md:p-8 '>
    <h2 className='mb-4 text-red font-semibold text-md'>CONTACT</h2>
    <h2 className='mb-4 text-white text-2xl'>My Contact</h2>
    <p className='mb-6 text-white text-sm heading-5 max-w-[700px] text-center mx-auto'>Esse irure consequat qui irure ullamco cupidatat magna do do. Minim laborum nulla esse et nulla in minim adipisicing. Minim laborum nulla esse et nulla in minim adipisicing.</p>
    <div className='mb-12 bg-red h-0.5 w-10 mx-auto' />
    <div className='mb-12 grid grid-cols-1 w-full max-w-[1100px] m-auto gap-y-3'>
      <form className='max-w-[600px] w-[350px] mx-auto '>
        <div className='mb-6'>
          <input className='bg-transparent text-white w-full py-2 px-3 border border-white rounded focus:outline-none focus:border-red' type='text' placeholder='Full Name' />
        </div>
        <div className='mb-6'>
          <input className='bg-transparent text-white w-full py-2 px-3 border border-white rounded focus:outline-none focus:border-red' type='email' placeholder='Email' />
        </div>
        <div className='mb-6'>
          <textarea className='bg-transparent text-white w-full py-2 px-3 border border-white rounded focus:outline-none focus:border-red' placeholder='Message' />
        </div>
        <div className='mb-6'>
          <button type="submit" className='px-10 py-2 border-2 hover:bg-red bg-transparent border-red font-semibold text-sm text-white rounded-full shadow-sm'>Send</button>
        </div>
      </form>

      <div className='col-span-1 text-white flex  place-items-center justify-center relative gap-x-2'>
        <span className="h-[2px] w-[20px] bg-white " /> OR <span className="h-[2px] w-[20px] bg-white " />
      </div>

      <div className='flex gap-4 mb-10 place-items-center justify-center '>
        <div className='items-center rounded-full p-2 border-red border-2 group hover:bg-red cursor-pointer'>
          <Icon iconName="facebook" iconProps={{ color: 'white' }} />
        </div>
        <div className='items-center rounded-full p-2 border-red border-2 hover:bg-red cursor-pointer'>
          <Icon iconName="linkedIn" iconProps={{ color: 'white' }} />
        </div>
      </div></div>
  </div>
)

export default Contact