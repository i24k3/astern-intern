import {initialize, staticRouter} from "./lib.js"

const server = initialize()

server.get("/abc", (req, res) => {

})

server.listen(3000)
