import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY ?? ''
});


const fetchImages = async () => {
  const images = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 10, 
  })

  const unsplashResults = images.response?.results.map(result => result.urls.small)
  return unsplashResults ?? [];
}

const getUrlForCoffeeStores = (latLong: string, query: string) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=-${latLong}&radius=20000&open_now=true`;
}

export default async function fetchCoffeeStores() {
  const images = await fetchImages();
  const options = { method: 'GET', headers: { accept: 'application/json', Authorization: process.env.FOURSQUARE_API_KEY! } };
  
  const url = getUrlForCoffeeStores("6.201670%2C106.788160", "coffee");
  
  const response = await fetch(url, options);

  const data = await response.json()
  return data.results.map((result: any, index: number) => {
    if (images.length === 0) {
      return result;
    }

    const neighborhood = result.location.cross_street;
    const address = result.location.address;

    return {
      ...result, imgUrl: images.length == 0 ? null : images[index], id: result.fsq_id, address: address, neighborhood: neighborhood
    }
  });
}