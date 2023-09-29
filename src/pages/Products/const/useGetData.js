const date = new Date()
const minutos = date.getMinutes();
const periodo = date.getHours() >= 12 ? 'PM' : 'AM';
const horas12 = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
const timeFormated = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;

export const data = [{
  category: "shirts",
  colors: ['Verde'],
  description: "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
  emailContent: "<p>awdawdwad</p>",
  date_created: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`,
  time_created: timeFormated,
  kids: true,
  men: false,
  post: false,
  product: "Air Jordan XXXV PF",
  product_code: "38BEE278",
  product_sku: "WW75K5218YW/SV",
  quantity: 46,
  regular_price: "98.42",
  sale_label: "rfesfe",
  sale_price: "98.42",
  size: ['9', '10'],
  taxes: "54",
  images: [],
  women: true,
}]