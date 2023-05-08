const express = require('express')
const app = express()
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafionode'
}

app.get('/', (request, response) => {
    const mysql = require('mysql2')
    let connection = mysql.createConnection(config)
    const randomName = uniqueNamesGenerator({dictionaries: [adjectives, animals]})
    const sqlInsertPeople = `INSERT INTO people (name) VALUES ('${randomName}');`
    connection.query(sqlInsertPeople)
    connection.end()

    connection = mysql.createConnection(config)
    const sqlSelectPeople = `SELECT name FROM people;`;
    connection.query(sqlSelectPeople, function (error, results, fields){
        response.send(
            `<h1>Full Cycle Rocks! Recarregue a página para gerar mais nomes!</h1><h3>${JSON.stringify(results)}</h3>`);
    });
    connection.end()
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})