const meteoriteModule = {

  meteorites: [],

  init: function () {
    this.cacheDOM();
    this.getMeteorites();
    this.bindEvents();
    this.render();
  },

  cacheDOM: function() {
    if(document.getElementById('app')) {
      this.app = document.getElementById('app');
      this.map = this.app.querySelector('#map');
      this.description = this.app.querySelector('#description');
      this.show = this.app.querySelector('#show');
      this.h2 = this.app.querySelector('h2');
      this.template = this.app.querySelector('#meteorite-template').innerHTML;
    }
  },

  bindEvents: function () {
    if (this.show) {
      this.show.addEventListener('click', () => {
        this.showMeteorite();
      })
    }
  },

  render: function () {

  },

  getMeteorites: function () {
    return fetch('https://data.nasa.gov/resource/y77d-th95.json')
              .then(result => result.json())
              .then(data => meteoriteModule.meteorites.push(...data));
  },

  initMap: function (meteoriteCoordinates) {
    const map = new google.maps.Map(this.map, {
      zoom: 4,
      center: meteoriteCoordinates
    });
    const marker = new google.maps.Marker({
      position: meteoriteCoordinates,
      map: map
    })
  },

  getRandomMeteoriteFrom: function (meteoriteList) {
    const randomNumber = Math.floor(Math.random() * meteoriteList.length);
    return meteoriteList[randomNumber];
  },

  showMeteorite: function () {
    const meteorite = this.getRandomMeteoriteFrom(this.meteorites);
    this.description.innerHTML = `Name: ${meteorite.name} Year: ${meteorite.year.slice(0, 4)} Weight: (${meteorite.mass / 1000}kg)`;
    this.h2 = Mustache.render(this.template, {name: meteorite.name});
    const coordinates = {lat: meteorite.geolocation.coordinates[1], lng: meteorite.geolocation.coordinates[0]};
    this.initMap(coordinates);
  }
};
meteoriteModule.init();