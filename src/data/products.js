import burger from './burger.json';
import combo from './combo.json';
import dessert from './dessert.json';
import pizza from './pizza.json';
import sauces from './sauces.json';
import snack from './snack.json';
import twister from './twister.json';
import wok from './wok.json';

export const products = {
  burger,
  combo,
  twister,
  snack,
  pizza,
  wok,
  dessert,
  sauces,
};

export const menu = [
  { name: 'Бургеры', id: 'burger' },
  { name: 'Комбо', id: 'combo' },
  { name: 'Твистеры', id: 'twister' },
  { name: 'Закуски', id: 'snack' },
  { name: 'Пицца', id: 'pizza' },
  { name: 'Вок', id: 'wok' },
  { name: 'Десерты', id: 'dessert' },
  { name: 'Соусы', id: 'sauces' },
];

export const menu2 = {
  burger: 'Бургеры',
  combo: 'Комбо',
  twister: 'Твистеры',
  snack: 'Закуски',
  pizza: 'Пицца',
  wok: 'ВОК',
  dessert: 'Дессерты',
  sauces: 'Соусы',
};
export const menu3 = {
  burger: 'Бургер',
  combo: 'Комбо',
  twister: 'Твистер',
  snack: 'Закуска',
  pizza: 'Пицца',
  wok: 'ВОК',
  dessert: 'Дессерт',
  sauces: 'Соус',
};
