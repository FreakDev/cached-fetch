import 'babel-polyfill'

import DataAdapter from './DataAdapter'
import { default as pm } from './adapters/pluginsManager'

import './adapters/fetch'
import './adapters/memory'
import './adapters/localStorage'

let adapters = {} 
adapters['cache'] = DataAdapter.getInstance('localStorage')
adapters['ajax'] = DataAdapter.getInstance('fetch')

let hooks = {}
hooks['onSaveCache'] = (data) => {
    return data;
}

const fetch = (url, options = {}) => {
    if (!options.checkNetwork || navigator.onLine) {
        let p = new Promise((r, f) => {
            adapters['ajax'].fetch(url, options).then((data) => {
                adapters['cache'].save(url, hooks.onSaveCache(data))
                r(data)
            }, (netErr) => {
                adapters['cache'].fetch(url, options).then((data) => {
                    r(data)
                }, (cacheErr) => {
                    f([netErr, cacheErr])
                })
            })          
        })
        return p
    } else {
        return adapters['cache'].fetch(url, options)
    }

}

export default fetch
export const setAdapter = (type, engine) => {
    adapters[type] = DataAdapter.getInstance(engine)
}
export const setHook = (event, hook) => {
    hooks[event] = hook
}
export const pluginsManager = pm

global.cfetch = {
    fetch,
    setAdapter,
    setHook,
    pluginsManager
}
