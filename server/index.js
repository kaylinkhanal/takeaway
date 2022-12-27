const express = require('express')
const app = express()
const port = 3005
app.use(express.json())
//query strings
//params
app.get('/products', (req, res) => {
    const arr =['apple','car']
    const newArr = arr.filter((item,id)=>{
        return item.startsWith(req.query.startswith)
        })
    /// 
    res.json({
        mgs: 'hello!',
        productsList: newArr
    })
})


app.get('/products/:id', (req, res) => {
    const arr = [
      { name: "hari", id: 32 },
      { name: "ram", id: 49 },
    ];
    const newArr= arr.filter((item,id)=>{
        return item.id === Number(req.params.id)
      })
        res.json({
            userDetails:  newArr[0].name
        })
})

app.post('/products', (req, res) => {
   console.log(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})