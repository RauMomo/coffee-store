const getUrlForCoffeeStores = (latLong: string, query: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=-${latLong}&radius=20000&open_now=true`;
}

export default async function fetchCoffeeStores() {
  const options = { method: 'GET', headers: { accept: 'application/json', Authorization: process.env.FOURSQUARE_API_KEY! } };
  
  const url = getUrlForCoffeeStores("6.201670%2C106.788160", "coffee");
  
  const response = await fetch(url, options);

  const data = await response.json()
  return data.results;
}