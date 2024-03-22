import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import Context from './store/FirebaseContext'
import {Firebase} from './firebase/config'

const root = createRoot(document.getElementById('root'));
root.render(
<FirebaseContext.Provider value={{Firebase:Firebase}}>

<Context>
<App />
</Context>

</FirebaseContext.Provider>
)