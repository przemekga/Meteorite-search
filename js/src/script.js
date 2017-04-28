const meteoriteModule = (function(){

  const app = document.getElementById('app');
  const map = app.querySelector('#map');
  const description = app.querySelector('#description');
  const show = app.querySelector('#show');
  const loadList = app.querySelector('#load-list');
  let meteoriteList = app.querySelector('#meteorite-list');
  const meteoriteListTemplate = app.querySelector('#meteorite-list-template').innerHTML;
  const showAllCheckbox = app.querySelector('#show-all');

  const meteorites = [];

  fetch('https://data.nasa.gov/resource/y77d-th95.json')
    .then(result => result.json())
    .then(data => {
        const mappedMeteorites = data.map(item => {
          if (item.year){
            item.year = item.year.slice(0,4);
          }
          item.mass = item.mass / 1000;
          return item;
        });
        meteorites.push(...mappedMeteorites);
    });


  show.addEventListener('click', showMeteorite);
  loadList.addEventListener('click', loadMeteoriteList);
  showAllCheckbox.addEventListener('change', showAll);


  function render() {

  }

  const gMap = new google.maps.Map(map, {
    zoom: 4,
    center: {
      lat: 0,
      lng: 0
    }
  });

  function initMap(meteoriteCoordinates) {
    const marker = new google.maps.Marker({
      position: meteoriteCoordinates,
      map: gMap
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
      meteorite: [...meteorites]
    };
    console.log(meteoriteListFragment);
    meteoriteList.innerHTML = Mustache.render(meteoriteListTemplate, meteoriteListFragment);
  }

  let gmarkers = [];

  function showAll() {
    if (showAllCheckbox.checked) {
      for (let i = 0; i < meteorites.length; i++) {
        const marker = new google.maps.Marker({
          position: {
            lng: meteorites[i].geolocation.coordinates[0],
            lat: meteorites[i].geolocation.coordinates[1],
          },
          map: gMap
        });
        gmarkers.push(marker);
      }
    } else {
      for(let i = 0; i < gmarkers.length; i++){
        gmarkers[i].setMap(null);
      }
    }
  }
})();