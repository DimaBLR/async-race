import {
  carList, control, header, main, winners,
} from '../index';

export function getRoute(): void {
  window.onpopstate = getRoute;
  header.arrLinks.forEach((el) => {
    (location.hash == el.getAttribute('href')) ? el.classList.add('link-active')
      : el.classList.remove('link-active');
  });
  if (location.hash == '') header.arrLinks[0].classList.add('link-active');

  main.element.innerHTML = '';
  const currentRouteName: string = window.location.hash.slice(1);

  const defaultRoute = {
    name: 'garage',
    component: () => {
      main.element.innerHTML = '<h1>Race field</h1>';
      main.element.appendChild(control.element);
      carList.updatePage();
    },
  };
  const routing = [{
    name: 'winners',
    component: () => {
      control.resetCars();
      winners.updatePage();
      main.element.appendChild(winners.element);
    },
  },
  ];
  const currentRoute = routing.find((p) => p.name === currentRouteName);
  (currentRoute || defaultRoute).component();
}
