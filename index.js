import express from "express"
import {userRouter} from './users/users.js'

const port = 8000;
const app = express();

app.all('/hello', (req, res) => {
    console.log('All')

})

app.use('/users',userRouter);

app.listen(port, () => {
    console.log(`Server work on ${port} port`)
})
