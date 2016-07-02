import pluginsManager from './pluginsManager'
import store from 'store'

export default pluginsManager.register('localStorage', {
    fetch: (key, options) => {
        return new Promise((r, f) => {
            if (store.has(key)) {
                r(store.get(key))
            } else {
                f('unknown key ' + key)
            }
        })
    },
    save: (key, value) => {
        store.set(key, value);
    }
})