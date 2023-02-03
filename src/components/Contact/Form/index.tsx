const Form = () => (<form className='max-w-[600px] w-[350px] mx-auto '>
    <div className='mb-6'>
        <input className='bg-transparent text-white w-full py-2 px-3 border border-white dark:border-black rounded focus:outline-none focus:border-red' type='text' placeholder='Full Name' />
    </div>
    <div className='mb-6'>
        <input className='bg-transparent text-white w-full py-2 px-3 border border-white dark:border-black rounded focus:outline-none focus:border-red' type='email' placeholder='Email' />
    </div>
    <div className='mb-6'>
        <textarea className='bg-transparent text-white w-full py-2 px-3 border border-white dark:border-black rounded focus:outline-none focus:border-red' placeholder='Message' />
    </div>
    <div>
        <button type="submit" className='px-10 py-2 border-2 hover:bg-red bg-transparent border-red font-semibold text-sm text-white rounded-full shadow-sm'>Send</button>
    </div>
</form>)

export default Form