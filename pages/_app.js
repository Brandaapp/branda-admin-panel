import '../styles/globals.css'
import Navbar from '../components/Navbar'

function App({ Component, pageProps }) {
  return (
    <div>
      <div className="row"><Navbar /></div>
      <div className="row"><Component {...pageProps} /></div>
    </div>
  )
}

export default App
