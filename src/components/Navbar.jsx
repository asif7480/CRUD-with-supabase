import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        {/* <nav>
          <h1>CRUD app</h1>
          <Link to={`/`}>Home</Link>
          <Link to={`/Create`}>Create</Link>
        </nav> */}
        <div className="container mx-auto w-screen">
            <div className="navbar bg-primary shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                {/* responsive menu start*/}
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to={`/`}>Home</Link></li>
                    <li><Link to={`/create`}>Create</Link></li>
                </ul>
                {/* responsive menu end*/}
                </div>
                <Link to={`/`} className="btn btn-ghost text-xl">
                    CRUD with Supabase
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={`/`}>Home</Link></li>
                    <li><Link to={`/create`}>Create</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="btn">Button</Link>
            </div>
            </div>
        </div>

    </>
  )
}

export default Navbar