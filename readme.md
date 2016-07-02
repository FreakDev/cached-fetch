# cFetch

## Cached Fetch

mini lib to automatically perform an ajax fetch and store its result into a cache

usage :

    <script src="../dist/index.js"></script>
    <script>
        cfetch.fecth("data.json", { checkNetwork: false /* default value : true */ });

        /// node 
        /// var cfetch = require('cfetch')
        /// cfecth.fetch("http://...", { /* options */ })
    </script>