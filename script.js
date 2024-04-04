const NULL_EMPTY_OR_BLANK_REGEX = /^\s*$/;

var planets = [];

document.addEventListener('DOMContentLoaded', function(){ set_planets() })

async function getAllPlanets(url, allPlanets = [])
{
  const data = await (await fetch(url)).json();
  allPlanets.push(...data.results);

  if (data.next) 
    return getAllPlanets(data.next, allPlanets);
  
  return allPlanets;
}

function findPlanets()
{
  search_field = document.getElementById('search_field');

  if (!NULL_EMPTY_OR_BLANK_REGEX.test(search_field.value))
  {
    for (let counter = 0; counter < planets.length; counter++)
    {
      if (planets[counter].name === search_field.value.trim())
      {
        return selectPlanet(counter);
      }     
    }

    alert("Planeta não encontrado!");
  }  
}

async function set_planets()
{
  planets = await getAllPlanets('https://swapi.dev/api/planets')

  planets.forEach((planet) =>
  {
    let li = document.createElement("li");

    li.innerHTML =
    `<button onclick="selectPlanet(${planets.indexOf(planet)})">${planet.name}</button>`

    planet_list.appendChild(li);
  })

  console.log(planets);
}

function selectPlanet(id)
{
  article = document.getElementById('planet_description');

  article.innerHTML = `
    <h1>${planets[id].name}</h1>
    <p>Clima: ${planets[id].climate}</p>
    <p>População: ${planets[id].population}</p>
    <p>Tipo de Terreno: ${planets[id].terrain}</p>`
}