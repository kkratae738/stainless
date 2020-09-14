import React from 'react'
import Header from './Header'
import Meme from './Meme'
import Error from './Error'
import { Route, Switch } from 'react-router-dom'
function App(){
    return(
        <>
        <div>
    <Header/>
    <Switch>
    <Route exact path="/" component={Meme} />
    <Route component={Error} />
    </Switch> 
    </div>
        </>
        )
}
export default App