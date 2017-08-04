'use strict';

import gridComponent from './grid.component';
import './grid.scss';

const gridModule = angular.module('grid-module', []);

gridModule
  .component('grid', gridComponent)
  .filter('mapStatus', () => {
    const genderHash = {
      1: 'Documentação',
      2: 'Programação',
      3: 'Concluída',
      4: 'Teste',
      5: 'Impedimento',
      6: 'Falta Vídeo'
    };

    return (input) => {
      if (!input) return '';
      else return genderHash[input];
    };
  })
  .filter('mapExpected', () => {
    const genderHash = {
      1: 'Sim',
      2: 'Não'
    };

    return (input) => {
      if (!input) return '';
      else return genderHash[input];
    };
  });

export default gridModule;