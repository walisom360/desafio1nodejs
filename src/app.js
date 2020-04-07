const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories.map(r => r))
});

app.post("/repositories", (request, response) => {
  const {title,url,techs,likes = 0} = request.body

  const repositorie = {id:uuid(),title,url,techs,likes}
  
  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params

  const {title,url,techs} = request.body

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex < 0){
    return response.status(400).json({erro:"Repositorie not found"})
  }

  const { likes } = repositories[repositorieIndex]

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  }


  repositories[repositorieIndex] = repositorie

  
  return response.json(repositorie)

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex < 0){
    return res.status(400).json({erro:"Repositorie not found"})
  }


  repositories.splice(repositorieIndex,1)

  return res.status(204).send()

});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if(repositorieIndex < 0){
    return res.status(400).json({erro:"Repositorie not found"})
  }

  const { likes } = repositories[repositorieIndex]
   
  repositories[repositorieIndex].likes = likes + 1

  return res.json(repositories[repositorieIndex])

});

module.exports = app;
