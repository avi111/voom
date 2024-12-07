import { Plane } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Plane className='h-8 w-8 text-indigo-600' />
            <h1 className='text-2xl font-bold text-gray-900'>Drone News Hub</h1>
          </div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
