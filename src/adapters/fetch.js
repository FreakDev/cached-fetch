import 'isomorphic-fetch'
import pluginsManager from './pluginsManager'

export default pluginsManager.register('fetch', {
    fetch
})

