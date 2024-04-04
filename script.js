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