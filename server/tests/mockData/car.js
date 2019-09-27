export const validCarData = [
  {
    state: 'new',
    // status: 'unsold',
    price: '10000000',
    manufacturer: 'Kia',
    model: 'Dehydra',
    body_type: 'car',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  },
  {
    state: 'used',
    // status: 'unsold',
    price: '10000000',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  }
];

export const invalidCarData = [
  // state 0
  {
    price: '30000000',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://www.cloudinary.com/photo/yellow-sports-car-during-day-time-39855.jpeg'
  },
  {
    state: 'usedd',
    price: '30000000',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://www.cloudinary.com/photo/yellow-sports-car-during-day-time-39855.jpg'
  },
  // price
  {
    state: 'used',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://www.cloudinary.com/photo/yellow-sports-car-during-day-time-39855.jpeg'
  },
  {
    state: 'usedd',
    price: '3000ert.',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://www.cloudinary.com/photo/yellow-sports-car-during-day-time-39855.jpeg'
  },
  // manufacturer
  {
    state: 'used',
    price: '30000000',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://www.cloudinary.com/photo/yellow-sports-car-during-day-time-39855.jpeg'
  },
  {
    state: 'used',
    price: '30000000',
    manufacturer: 'Toyota4',
    model: 'Avalon',
    body_type: 'car',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  },
  // model
  {
    state: 'new',
    price: '30000000',
    manufacturer: 'Toyota',
    body_type: 'car',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  },
  {
    state: 'new',
    price: '30000000',
    manufacturer: 'Toyota',
    model: 'Avalon.34',
    body_type: 'car',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  },
  // bodytype
  {
    state: 'used',
    price: '30000000',
    manufacturer: 'Toyota',
    model: 'Avalon',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  },
  {
    state: 'used',
    price: '30000000',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'ca.r',
    img_url: 'https://res.cloudinary.com/oseun/image/upload/v1559912278/toyota-runner.jpg'
  },
  // imageurl
  {
    state: 'used',
    price: '30000000',
    manufacturer: 'Toyota',
    model: 'Avalon',
    body_type: 'car'
  }
];
