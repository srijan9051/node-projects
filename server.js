const express = require('express')
const path = require('path')
const multer  = require('multer')
const {mergedPdf}=require('./merge')
const upload = multer({ dest: 'uploads/'}) 
const app = express()
app.use('/static',express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next) =>{
  
    let d=await mergedPdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`https://github.com/srijan9051/node-projects/blob/master/public/${d}.pdf`)
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})