import { displayServerError, HideableElement } from './utils.js';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/styles';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catInfo: new HideableElement(document.querySelector('.cat-info'), 'cat-info'),
  loader: new HideableElement(document.querySelector('.loader'), 'loader'),
};

const breedSelect = new SlimSelect({
  select: refs.breedSelect,
  events: {
    afterChange: onBreedSelectChange,
  },
});

breedSelect.disable();
refs.catInfo.hide();

fetchBreeds()
  .then(response => {
    const options = response.data.map(breed => {
      return {
        text: breed.name,
        value: breed.id,
      };
    });

    breedSelect.setData(options);
    breedSelect.enable();
    refs.catInfo.show();
  })
  .catch(function (error) {
    displayServerError(error);
  })
  .finally(() => {
    refs.loader.hide();
  });

function onBreedSelectChange(options) {
  refs.loader.show();

  const breedId = options[0].value;
  fetchCatByBreed(breedId)
    .then(response => {
      const cat = response.data[0];
      refs.catInfo.element.innerHTML = createCatInfoMarkup(cat);
    })
    .catch(function (error) {
      displayServerError(error);
    })
    .finally(() => {
      refs.loader.hide();
    });
}

function createCatInfoMarkup(cat) {
  const {
    url,
    breeds: [info],
  } = cat;

  return `<img src="${url}" alt="${info.name}" class="cat-image">
    <div class="cat-info-text">
    <h2>${info.name}</h2>
    <p>${info.description}</p>
    <p><span class="text-bold">Temperament:</span> ${info.temperament}</p>
    </div>`;
}
