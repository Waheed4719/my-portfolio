import Hero from '../components/Hero';
import MyProjects from '../components/MyProjects';
import MyStack from '../components/MyStack';
import MyServices from '../components/MyServices';
import Contact from '../components/Contact';
import AboutMe from '../components/AboutMe';
import MyExperience from '../components/MyExperience';
import Drawer from '../components/Drawer';

export default () => (
    <div className='dark:bg-[#1a1b1e] bg-white'>
        <Hero />
        <AboutMe />
        <MyExperience />
        <MyServices />
        <MyStack />
        <MyProjects />
        <Contact />
        <Drawer />
    </div>
);
