import { Route, Routes } from 'react-router-dom'
import Author from './pages/Author.tsx'
import Home from './pages/Home.tsx'
import Header from './components/Header.tsx'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />

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
