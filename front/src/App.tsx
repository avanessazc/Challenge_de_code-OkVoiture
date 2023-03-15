import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './input.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import EmailConfirm from './pages/EmailConfirm'

function App() {
    return (
        <Router>
            <div className=''>
                <Navbar />
                <Footer />
                <div className='content'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route path='/email-confirmation/:token'>
                            <EmailConfirm />
                        </Route>
                        <Route path='*'>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App
