import emailjs from '@emailjs/browser';

const Form = () => {
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID } = process.env;
        if (!REACT_APP_EMAILJS_SERVICE_ID || !REACT_APP_EMAILJS_TEMPLATE_ID) {
            console.log('No env variables found');
            return;
        }
        const templateParams = {
            from_name: 'James',
            message: 'Check this out!'
        };
        emailjs
            .send(
                REACT_APP_EMAILJS_SERVICE_ID ?? '',
                REACT_APP_EMAILJS_TEMPLATE_ID ?? '',
                templateParams
            )
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                    console.log('FAILED...', error);
                }
            );
    };

    return (
        <form onSubmit={sendEmail} className='max-w-[600px] w-[350px] mx-auto '>
            <div className='mb-6'>
                <input
                    className='bg-transparent text-white dark:text-black w-full py-2 px-3 border border-white dark:border-black rounded focus:outline-none focus:border-red'
                    type='text'
                    placeholder='Full Name'
                />
            </div>
            <div className='mb-6'>
                <input
                    className='bg-transparent text-white dark:text-black w-full py-2 px-3 border border-white dark:border-black rounded focus:outline-none focus:border-red'
                    type='email'
                    placeholder='Email'
                />
            </div>
            <div className='mb-6'>
                <textarea
                    className='bg-transparent text-white dark:text-black w-full py-2 px-3 border border-white dark:border-black rounded focus:outline-none focus:border-red'
                    placeholder='Message'
                />
            </div>
            <div>
                <button
                    type='submit'
                    className='ease-in-out duration-300 px-10 py-2 border-2 hover:bg-red dark:hover:text-white bg-transparent border-red font-semibold text-sm text-white dark:text-black rounded-full shadow-sm'
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default Form;
