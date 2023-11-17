import { displayError, HideableElement } from './utils.js';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/styles';

const errorTitle = '❌';
const errorMessage = 'Oops! Something went wrong! Try reloading the page!';
let breedSelectDataSet = false;

const refs = {
  breedSelect: new HideableElement(
    document.querySelector('.breed-select'),
    'breed-select'
  ),
  catInfo: new HideableElement(document.querySelector('.cat-info'), 'cat-info'),
  loader: new HideableElement(document.querySelector('.loader'), 'loader'),
};

refs.breedSelect.hide();
refs.catInfo.hide();

fetchBreeds()
  .then(response => {
    const options = response.data.map(breed => {
      return {
        text: breed.name,
        value: breed.id,
      };
    });

    const breedSelect = new SlimSelect({
      select: refs.breedSelect.element,
      events: {
        afterChange: onBreedSelectChange,
      },
    });

    breedSelect.setData(options);
    refs.breedSelect.show();
  })
  .catch(function (error) {
    displayError(errorTitle, errorMessage);
  })
  .finally(() => {
    refs.loader.hide();
  });

function onBreedSelectChange(options) {
  if (!breedSelectDataSet) {
    breedSelectDataSet = true;
    return;
  }

  refs.loader.show();

  const breedId = options[0].value;

  fetchCatByBreed(breedId)
    .then(response => {
      const cat = response.data[0];
      refs.catInfo.element.innerHTML = createCatInfoMarkup(cat);
      refs.catInfo.show();
    })
    .catch(function (error) {
      refs.catInfo.hide();
      displayError(errorTitle, errorMessage);
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
