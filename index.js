const express= require("express")
import cors from "cors";
const app=express()
const data=require('./MOCK_DATA.json')
const fs= require("fs")
const PORT=5000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.json(data)
})
app.post('/Post',(req,res)=>{
    const newUser=req.body
    data.push({...newUser,id: data.length+1})

    fs.writeFile('./MOCK_DATA.json',JSON.stringify(data),(err)=>{
        if(err){
           return res.status(500).json({message: "Error saving data"})
        }
  res.json({ message: "Data added successfully", user: newUser })
    })
})
app.get('/:id',(req,res)=>{
    const id=Number(req.params.id)
    const user=data.find((user)=>user.id==id)
    return res.json(user)
})

app.listen(PORT,()=>console.log("HI server"))