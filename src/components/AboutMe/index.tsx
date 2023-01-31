import MyImage from '../../assets/images/me.jpg';

const AboutMe = () => (
  <div id='aboutme' className='container mx-auto text-center p-6 md:p-8 '>
    <h2 className='mb-4 text-red font-semibold text-md'>ABOUT</h2>
    <h2 className='mb-4 text-white text-2xl'>About Me</h2>
    <div className='w-[1100px] max-w-full m-auto grid grid-cols-1 gap-3'>
      <div className='flex items-center justify-center mb-6'>
        <img src={MyImage} alt='profile' className='rounded-full w-[120px]' />
      </div>

      <div className='flex flex-col items-center justify-start gap-y-3 max-w-[700px] m-auto '>
        <p className='text-white text-sm text-center mb-4'>
          Sit do nostrud qui officia enim. Ex id esse minim officia sint fugiat
          consectetur exercitation Lorem nostrud esse excepteur. Enim do excepteur magna
          excepteur et esse aliqua adipisicing quis minim enim. Ad sunt deserunt ullamco
          est mollit aute ipsum quis.
        </p>

        <a
          download='Waheed Uddin Ahmed - Resume.pdf'
          href='/files/Waheed Uddin Ahmed - Resume.pdf'
          target='_blank'
          className='px-10 py-2 border-2 hover:bg-red bg-transparent border-red font-semibold text-sm text-white rounded-full shadow-sm'
        >
          My Resume
        </a>

      </div>
    </div>
  </div>
);

export default AboutMe;
