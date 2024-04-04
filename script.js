var planets = [];

async function getAllPlanets(url, allPlanets = [])
{
  const data = await (await fetch(url)).json();
  allPlanets.push(...data.results);

  if (data.next) 
  {
    return getAllPlanets(data.next, allPlanets);
  }
  
  return allPlanets;
}

async function printAllPlanets()
{
  console.log(await getAllPlanets('https://swapi.dev/api/planets'));
}

async function findPlanets()
{
  planets = await getAllPlanets('https://swapi.dev/api/planets')

  planets.forEach((planet) =>
  {
    let li = document.createElement("li");

    li.innerHTML =
    `<button onclick="selectPlanet(${planets.indexOf(planet)})">${planet.name}</button>`

    planet_list.appendChild(li);
  })
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