import { Link, Route, Routes } from 'react-router-dom'
import { Plane } from 'lucide-react'
import Author from './pages/Author.tsx'
import Home from './pages/Home.tsx'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Plane className='h-8 w-8 text-indigo-600' />
              <h1 className='text-2xl font-bold text-gray-900'>
                Drone News Hub
              </h1>
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

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/author' element={<Author />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
