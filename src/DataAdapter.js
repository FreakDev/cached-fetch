import pluginsManager from './adapters/pluginsManager'

var context = {} // create a context object to enforce not using the constructor outside of the class

export default class DataAdatper {

    constructor (engine, ctx) {
        if (ctx === context) {
            this.dataSrc = Object.assign({}, pluginsManager.load(engine))
        } else {
            throw Error ('please use the static getInstance() method')
        }
    }

    static getInstance(engine) {
        return new DataAdatper(engine, context)
    }

    fetch() {
        return this.dataSrc.fetch.apply(global, [...arguments])
    }

    save(key, value) {
        if (this.dataSrc.save)
            this.dataSrc.save.apply(this, [...arguments])
        else {
            throw Error('no save method available for this adapter');
        }
    }

}