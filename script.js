const NULL_EMPTY_OR_BLANK_REGEX = /^\s*$/;
let planets = [];

document.addEventListener('DOMContentLoaded', function() { set_planets() })

async function getAllPlanets(url, allPlanets = [])
{
  const DATA = await (await fetch(url)).json();
  
  allPlanets.push(...DATA.results);

  if (DATA.next) 
    return getAllPlanets(DATA.next, allPlanets);
  
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
        return selectPlanet(counter); 
    }

    alert("Planeta não encontrado!");
  }  
}

async function set_planets()
{
  planets = await getAllPlanets('https://swapi.py4e.com//api/planets');
  const PLANET_LIST = document.getElementById('planet_list');

  planets.forEach((planet) =>
  {
    let li = document.createElement("li");

    li.innerHTML =
    `
      <button onclick="selectPlanet(${planets.indexOf(planet)})">
        ${planet.name}
      </button>
    `;

    PLANET_LIST.appendChild(li);
  })

  console.log(planets);
}

async function selectPlanet(id)
{
  document.getElementById('planet_description').innerHTML =
  `
    <h2>${planets[id].name}</h2>
    <p>Clima: ${planets[id].climate}</p>
    <p>População: ${planets[id].population}</p>
    <p>Tipo de Terreno: ${planets[id].terrain}</p>
    
    <h3>Habitantes Famosos</h3>
    <table>
      <thead>
        <th>Nome</th>
        <th>Data de Nascimento</th>
      </thead>
      <tbody id="resident_rows">
      </tbody>
    </table>
  `;

  let resident_rows = document.getElementById('resident_rows');

  planets[id].residents.forEach(async (resident_url) =>
  {
    const RESIDENT = await (await fetch(resident_url)).json()
    let tr = document.createElement('tr');

    tr.innerHTML =
    `
      <td>${RESIDENT.name}</td>
      <td>${RESIDENT.birth_year}</td>
    `;

    resident_rows.appendChild(tr);
  })
}