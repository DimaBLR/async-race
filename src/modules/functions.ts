export function generateName(): string {
  const brands = ['Opel', 'Jaguar', 'Renault', 'Mazda', 'Toyota', 'BMW', 'Audi', 'Jeep', 'Honda', 'Ford', 'Chevrolet', 'Tesla'];
  const models = ['Captur', 'A8', 'CX-7', 'Duster', 'Avensis', '323', 'Tuareg', 'Octavia', 'Civic', 'Transit', 'Spark', 'Corsa'];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
}

export function generateColor(): string {
  const item = '0123456789ABCDEF';
  let color = '#';
  let i = 0;
  while (i !== 6) {
    i++;
    color += item[Math.floor(Math.random() * 16)];
  }
  return color;
}
