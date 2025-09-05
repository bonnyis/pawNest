import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/routes/routes'

const Header = () => {
  const fouceActiveCss = `relative inline-block pb-1
             before:content-[''] before:absolute before:bottom-[-2px] before:left-0 
             before:h-[1px] before:w-0 before:opacity-0 before:bg-pinkColor 
             before:transition-[width] before:duration-300 before:tansition-all
             hover:before:w-full hover:before:opacity-100`;
  return (
<nav className="header h-24 flex items-center justify-center border-b-1">
  <div className="flex justify-between items-center w-full max-w-[1200px] px-4" >
    <div className="w-40">
      <Link to={ROUTES.HOME}>POWNEST</Link>
    </div>

    <ul className="menu flex space-x-8">
      <Link to={ROUTES.HOME}><li className={fouceActiveCss}>HOME</li></Link>
      <Link to={ROUTES.MISSING}><li className={fouceActiveCss}>MISSING</li></Link>
      <Link to={ROUTES.ADOPTION}><li className={fouceActiveCss}>ADOPTION</li></Link>
      <Link to={ROUTES.COMMUNITY}><li className={fouceActiveCss}>COMMUNITY</li></Link>
      <Link to={ROUTES.VOLUNTEER}><li className={fouceActiveCss}>VOLUNTEER</li></Link>
    </ul>
  </div>
</nav>
  )
}

export default Header