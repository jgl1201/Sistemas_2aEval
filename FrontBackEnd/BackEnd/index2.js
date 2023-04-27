let express = require('express')
let cors = require("cors")
const { Configuration, OpenAIApi } = require("openai");


let app = express()
app.use(cors())

const configuration = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(configuration) 

function saludar(req, res) {
    res.json("hola, soy el backend de Llorch")
}
function calcular(req, res) {
    let num1 = 2
    let num2 = 5
    let result = num1+num2+''
    res.json(result)
}

function suma(req, res) {
    let num1 = +req.params.num1
    let num2 = +req.params.num2
    let result = num1 + num2
    res.send(result + "")
}

// http://localhost:3000/pair?sex=mujer&age=20&talks=mucho&beauty=baja
async function getPair(req, res) {
    const sex = req.query.sex
    const age = req.query.age
    const talks = req.query.talks
    const beauty = req.query.beauty

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Soy ${sex} de ${age} años que habla ${talks} y soy  ${beauty}. Dame consejos para encontar pareja.`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      });

    res.send(response.data.choices[0].text)
}

// 127.0.0.1:3000/hola
// localhost:3000/hola
// 10.101.17.22:3000/hola (Angel)
// 10.101.17.57:3000/hola (yo)


app.get("/hola", saludar)
app.get("/", calcular)
app.get("/suma/:num1/:num2", suma)
app.get("/pair", getPair)

app.listen(3000)
console.log('Servidor encendido y a la escucha en el puerto 3000')