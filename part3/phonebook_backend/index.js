const express = require('express');
const app = express();

app.use(express.json());

let persons =  [
    {
        "name": "lei jun",
        "number": "2189392183",
        "id": 1
      },
      {
        "name": "Tony chen",
        "number": "123123",
        "id": 2
      },
      {
        "name": "xiao hong",
        "number": "123123",
        "id": 3
      },
      {
        "name": "xiao gang",
        "number": "123123",
        "id": 4
      }
  ]

/**
 * 获取所有联系人
 */
app.get('/api/persons',(req,rsp)=>{
    if(!persons) {
        return rsp.status(400).json({error:'There is no any data.'})
    }

    return rsp.status(200).json(persons);
})

/**
 * 获取总体描述
 */
app.get('/api/infos',(req,rsp) => {
    const curTime = new Date();
    rsp.send(
        `Phonebook has info for ${persons.length} people.<br/>
        ${curTime}`
    )
})

/**
 * 根据id查询
 */
app.get('/api/persons/:id',(req,rsp) => {
    const id = Number(req.params.id);
    console.log('get person info id: ',id);
    const person = persons.find(p => p.id === id);
    if(person) {
        return rsp.status(200).json(person);
    }
    return rsp.status(400).json({error:`Can't find the person info that id=${id}`})
})

app.post('/api/persons',(req,rsp) => {
    const body = req.body;
    console.log('post request body: ',body);
    if(!body.name) {
        return rsp.status(400).json({error:'Name must not be empty'});
    }
    if(!body.number) {
        return rsp.status(400).json({error:'Number must not be empty'});
    }
    const isExist = persons.find(p => p.name === body.name);
    if(isExist) {
        return rsp.status(400).json({error:'Name must be unique'});
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person);
    rsp.status(200).json(person);
})

const generateId = () => {
    return persons.length > 0 
        ? Math.max(...persons.map(p => p.id)) + 1 : 0;
}


const PORT = 3001;
app.listen(PORT,()=> {
    console.log('Server is listenning port:'+PORT);
})