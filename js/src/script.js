const meteoriteModule = (function(){

  const app = document.getElementById('app');
  const map = app.querySelector('#map');
  const description = app.querySelector('#description');
  const show = app.querySelector('#show');
  const loadList = app.querySelector('#load-list');
  let meteoriteList = app.querySelector('#meteorite-list');
  const meteoriteListTemplate = app.querySelector('#meteorite-list-template').innerHTML;

  const meteorites = [];

  fetch('https://data.nasa.gov/resource/y77d-th95.json')
    .then(result => result.json())
    .then(data => meteorites.push(...data));


  show.addEventListener('click', showMeteorite);
  loadList.addEventListener('click', loadMeteoriteList);


  function render() {

  }


  function initMap(meteoriteCoordinates) {
    const map = new google.maps.Map(this.map, {
      zoom: 4,
      center: meteoriteCoordinates
    });
    const marker = new google.maps.Marker({
      position: meteoriteCoordinates,
      map: map
    })
  }

  function getRandomMeteoriteFrom(meteoriteList) {
    const randomNumber = Math.floor(Math.random() * meteoriteList.length);
    return meteoriteList[randomNumber];
  }

  function showMeteorite() {
    const meteorite = getRandomMeteoriteFrom(meteorites);
    description.innerHTML = `Name: ${meteorite.name} Year: ${meteorite.year.slice(0, 4)} Weight: ${meteorite.mass / 1000}kg`;
    // const rendered = Mustache.render(this.template, meteorite);
    // this.description.innerHTML = rendered;
    const coordinates = {lat: meteorite.geolocation.coordinates[1], lng: meteorite.geolocation.coordinates[0]};
    initMap(coordinates);
  }

  function loadMeteoriteList() {
    const meteoriteListFragment = {
      meteorite: [...meteorites.slice(0, 100)]
    };
    console.log(meteoriteListFragment);
    meteoriteList.innerHTML = Mustache.render(meteoriteListTemplate, meteoriteListFragment);
  }

  return {
    render: render
  }
})();