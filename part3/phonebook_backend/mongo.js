// mongodb+srv://cyd:<password>@cluster0.3qpvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

console.log('pw:', password);

const url = `mongodb+srv://cyd:${password}@cluster0.3qpvj.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false
});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema)

//若命令行参数中指定了name number则插入的数据库
if (name && number) {
    const person = new Person({
        name: `${name}`,
        number: `${number}`
    })
    //插入一条记录
    person.save().then(result => {
        console.log('person saved');
        mongoose.connection.close()
    })
} else {
    //列出所有条目
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name}`,`${person.number}`);
        })
        mongoose.connection.close();
    })
}
