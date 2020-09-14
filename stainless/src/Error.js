import React from 'react'
import './App.css'
import {Link }from 'react-router-dom'
function Error(){
	return(
		<div className="error">
		<div className="banner">
            <h1>ERROR</h1>
            <div></div>

            <p>404 NOT FOUND</p>
	<Link to='/' id="btn-primary">
		GO HOME 
       </Link>
        </div>

		</div>
		)
}

export default Error