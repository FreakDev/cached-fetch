
var plugins = {}

export default {
    register: (key, plugin) => {
        plugins[key] = plugin
        return plugin
    },
    load: (key) => {
        if (plugins[key]) {
            let plugin = plugins[key];
            if (typeof plugin === 'object') {
                return plugin
            } else if(typeof plugin === 'function') {
                return plugin();
            }
        } else {
            throw Error ('no plugins found for key ' + key)
        }
    }

} 