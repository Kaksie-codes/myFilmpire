import Herosection from '../components/Herosection/Herosection'
import Tabs from '../components/tabs/Tabs'
import MoreText from '../components/moretext/MoreText'
import Faqs from '../components/faqs/Faqs'


const LandingPage = () => {
  return (
    <div>
        <Herosection/>
        <Tabs/>        
        <MoreText/>
        <Faqs/>
    </div>
  )
}

export default LandingPage