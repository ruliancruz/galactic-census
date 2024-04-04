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
  (await getAllPlanets('https://swapi.dev/api/planets')).forEach((planet) =>
  {
    let li = document.createElement("li");
    li.innerHTML = `<button>${planet.name}</button>`
    planet_list.appendChild(li);
  })
}