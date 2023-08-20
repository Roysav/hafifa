import * as express from 'express';

const app = express()
const port = 3000

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello Avidor')
})


app.listen(port, () => {
    console.log(`Express app started at port ${port}`)
})