import 'es6-object-assign/auto' // Requirement of various dependencies in IE 10, 11
import 'es6-promise/auto' // Polyfill for Promises
import React from 'react'
import ReactDOM from 'react-dom'
import 'skeleton-css/css/normalize.css'
import 'skeleton-css/css/skeleton.css'
import Root from '@common/Root'
import '@fortawesome/fontawesome-free/css/all.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import envs from './envs.js'

if (envs) ReactDOM.render(<Root />, document.getElementById('root'))
