import pluginsManager from './pluginsManager'

var data = {}

export default pluginsManager.register('memory', {
    fetch: (key, options) => {
        return new Promise((r, f) => {
            if (data[key]) {
                r(data[key])
            } else {
                f('unknown key ' + key)
            }
        })
    },
    save: (key, value) => {
        data[key] = value;
    }
})