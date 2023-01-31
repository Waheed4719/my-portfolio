import Hero from '../components/Hero'
import MyProjects from '../components/MyProjects'
import MyStack from '../components/MyStack'
import MyServices from '../components/MyServices'
import Contact from '../components/Contact'
import AboutMe from '../components/AboutMe'


export default () => (
  <div className="bg-[#1a1b1e]">
    <Hero />
    <AboutMe />
    <MyServices />
    <MyStack />
    <MyProjects />
    <Contact />
  </div>
)