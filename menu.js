/* Carta M7 Lounge — edita aquí productos y precios */
(function(){
"use strict";
window.M7_MENU = {
  'Cócteles': [
    { title: 'Mojitos', items: [
      { n: 'Mojito Clásico', d: 'Lima, menta, azúcar moreno y ron', p: '7,00€' },
      { n: 'Mojito Fresa', p: '8,00€' }, { n: 'Mojito Mango', p: '8,00€' },
      { n: 'Mojito Maracuyá', p: '8,00€' }, { n: 'Mojito Lichy', p: '8,00€' },
      { n: 'Mojito Coco', p: '8,00€' }, { n: 'Mojito Piña', p: '8,00€' } ] },
    { title: 'Daiquiris', items: [
      { n: 'Daiquiri Clásico', d: 'Jugo de limón, licor de naranja, ron y almíbar', p: '7,50€' },
      { n: 'Daiquiri Fresa', p: '10,00€' }, { n: 'Daiquiri Mango', p: '10,00€' },
      { n: 'Daiquiri Maracuyá', p: '10,00€' }, { n: 'Daiquiri Piña', p: '10,00€' } ] },
    { title: 'Mules', items: [
      { n: 'Moscu Mule', d: 'Vodka, jugo de lima, ginger beer y rodaja de lima', p: '10,00€' },
      { n: 'London Mule', d: 'Ginebra', p: '10,00€' },
      { n: 'Mexican Mule', d: 'Tequila', p: '10,00€' },
      { n: 'Caracas Mule', d: 'Ron', p: '10,00€' } ] },
    { title: 'Caipirinhas', items: [
      { n: 'Caipirinha', d: 'Lima, azúcar moreno y cachaza', p: '8,50€' },
      { n: 'Caipirinha de Maracuyá', d: 'Lima, sirope de maracuyá, azúcar moreno y cachaza', p: '10,00€' },
      { n: 'Caipiroska', d: 'Vodka, trozo de lima y azúcar moreno', p: '8,50€' } ] },
    { title: 'De la casa', items: [
      { n: 'Michelada', d: 'Jugo de lima, cerveza Coronita, salsa picante, sal, tajín y salsa inglesa', p: '8,00€' },
      { n: 'Expresso Martini', d: 'Café, almíbar, vodka y licor de café', p: '8,50€' },
      { n: 'Southside', d: 'Ginebra, jugo de limón y menta', p: '8,00€' },
      { n: 'Tom Collins', d: 'Jugo de limón, ginebra y licor de naranja', p: '8,00€' },
      { n: 'Bloody Mary', d: 'Zumo de tomate, vodka, jugo de lima, salsa Tabasco, sal y pimienta', p: '12,00€' },
      { n: 'Baby 43', d: 'Licor 43, licor café, Baileys y leche', p: '8,00€' },
      { n: 'Bahama', d: 'Ron de coco, ron oscuro y blanco, jugo de piña, jugo de naranja y granadina', p: '10,00€' } ] },
    { title: 'Clásicos', note: 'El Cosmopolitan puede pedirse sin alcohol. Consúltanos por opciones sin alcohol en otras bebidas.', items: [
      { n: 'Tequila Sunrise', d: 'Jugo de naranja, jugo de melocotón, vodka y licor de melocotón', p: '10,00€' },
      { n: 'Amaretto Sour', d: 'Amaretto, jugo de limón y almíbar', p: '8,00€' },
      { n: 'Aperol Spritz', d: 'Aperol, cava y soda', p: '8,00€' },
      { n: 'Apple Spritz', p: '8,00€' },
      { n: 'Blue Lagoon', d: 'Jugo de piña, ron malibú, vodka, sirope de coco, leche condensada y blue curaçao', p: '10,00€' },
      { n: 'Margarita', d: 'Jugo de limón, almíbar, tequila y licor de naranja', p: '8,50€' },
      { n: 'Manhattan', d: 'Whisky, vermut rojo y angostura', p: '10,00€' },
      { n: 'Long Island', d: 'Ron, vodka, tequila, ginebra, jugo de limón, licor de naranja y cola', p: '10,00€' },
      { n: 'Sex on the Beach', d: 'Jugo de naranja, jugo de melocotón, vodka y licor de melocotón', p: '10,00€' },
      { n: 'Mai Thai', d: 'Ron añejo, ron blanco, triple seco, jugo de lima, amaretto y almíbar', p: '10,00€' },
      { n: 'Sidecar', d: 'Brandy, licor de naranja y jugo de limón', p: '8,00€' },
      { n: 'Negroni', d: 'Vermut rojo, campari y ginebra', p: '9,00€' },
      { n: 'Porn Star Martini', d: 'Jugo de lima, vodka, Passoã, sirope de vainilla y de maracuyá', p: '12,00€' },
      { n: 'Dry Martini', d: 'Ginebra y vermut italiano', p: '8,00€' },
      { n: 'Piña Colada', d: 'Piña, leche condensada, ron blanco, licor malibú y sirope de coco', p: '9,00€' },
      { n: 'Cosmopolitan', d: 'Jugo de lima, licor de mora, licor de frambuesa, sirope de fresa, vodka y licor de naranja', p: '10,00€' } ] }
  ],
  'Shishas': [
    { title: 'Afrutado', price: '15€', items: [
      { n: 'Love', d: 'Maracuyá, melón, menta y sandía' }, { n: 'Lady Killer', d: 'Mango, melocotón, menta y hielo' },
      { n: 'Carnival', d: 'Fruta exótica' }, { n: 'Uff', d: 'Sandía fresca' }, { n: 'Euphoria', d: 'Melón dulce' },
      { n: 'Miss Jossy', d: 'Fresa y frambuesa' }, { n: 'Clipporizz', d: 'Fresa, arándanos, frambuesa y cereza' },
      { n: 'Ice Kaktuz', d: 'Frescor al tuno' }, { n: 'Africa Queen', d: '16 frutas' },
      { n: 'Winter is Coming', d: 'Fruta del dragón / pitahaya' }, { n: 'Blue Iss', d: 'Arándano y hielo' },
      { n: 'Huracán', d: 'Frutos silvestres' }, { n: 'Big Boy', d: 'Sandía y hielo' }, { n: 'Purplee', d: 'Fresa y frambuesa' } ] },
    { title: 'Cítrico', price: '15€', items: [
      { n: 'Pomaye', d: 'Pomelo y maracuyá' }, { n: '4B Limón', d: 'Limón dulce' },
      { n: 'Kaktuz Limón', d: 'Frescor con limón' }, { n: 'Bloody Punch', d: 'Pomelo y naranja' },
      { n: 'Rimshot', d: 'Mandarina' }, { n: 'Pablo', d: 'Lima y arándano seco' } ] },
    { title: 'Dulces', price: '15€', items: [
      { n: 'White Cake', d: 'Tarta de queso' }, { n: 'Winter Edition', d: 'Galleta de mantequilla' },
      { n: 'Kaffayayo', d: 'Coco' }, { n: 'White Cake Limón', d: 'Tarta de queso con limón' },
      { n: 'White Cake Coco', d: 'Tarta de queso de coco' }, { n: 'Bono', d: 'Frapuccino' } ] },
    { title: 'Mentoladas', price: '15€', items: [
      { n: 'Old School', d: 'Uva y menta' }, { n: 'Rasberry Mint', d: 'Frambuesa y menta' },
      { n: 'Sexy Green', d: 'Menta dulce' }, { n: 'Limón Mint', d: 'Limón y menta dulce' },
      { n: 'Doble Apple Mint', d: 'Doble manzana, anís y menta' } ] },
    { title: 'Tabaco Negro', price: '20€', note: 'Más de 20 sabores — pregunta al camarero.', items: [
      { n: 'Pikman', d: 'Fresa y frambuesa' }, { n: 'Kyoto', d: 'Melocotón y lima' },
      { n: 'Zucca', d: 'Coca cola' }, { n: 'Darknana', d: 'Fresa y frambuesa' },
      { n: 'Huracán', d: 'Frutos silvestres' }, { n: 'R-Gams', d: 'Lima y limón' } ] }
  ],
  'Combinados': [
    { title: 'Ginebra', items: [
      { n: 'Larios', p: '7,50€' }, { n: 'Puerto de India', p: '7,50€' }, { n: 'Bombay', p: '8,00€' },
      { n: 'Bombay Saphire', p: '8,00€' }, { n: 'Tanqueray', p: '8,00€' }, { n: 'Beefeater', p: '8,00€' },
      { n: 'Larios XII', p: '8,00€' }, { n: 'Puerto de India Sabor', d: 'Fresa, mango, melón o mora', p: '8,00€' },
      { n: 'Bulldog', p: '10,00€' }, { n: 'Nordés', p: '12,00€' }, { n: "Hendrick's", p: '15,00€' },
      { n: "Martin Miller's", p: '15,00€' } ] },
    { title: 'Ron', items: [
      { n: 'Negrita', p: '7,50€' }, { n: 'Flor de Caña «V»', p: '8,00€' }, { n: 'Arehucas', p: '8,00€' },
      { n: 'Cacique', p: '8,00€' }, { n: 'Bacardi', p: '8,00€' }, { n: 'Brugal', p: '8,00€' },
      { n: 'Barceló', p: '8,00€' }, { n: 'Legendario', p: '9,00€' }, { n: 'Flor de Caña «VII»', p: '10,00€' },
      { n: 'Havana «7»', p: '10,00€' }, { n: 'Brugal Doble Reserva', p: '10,00€' },
      { n: 'Brugal Extraviejo', p: '10,00€' }, { n: 'Barceló Imperial', p: '15,00€' }, { n: 'Diplomático', p: '15,00€' } ] },
    { title: 'Vodka', items: [
      { n: 'Eristof', p: '7,50€' }, { n: 'Smirnoff', p: '8,00€' }, { n: 'Absolut', p: '8,00€' },
      { n: 'Cîroc', p: '12,00€' }, { n: 'Cîroc Sabor', d: 'Melocotón, piña, mango, coco o manzana', p: '13,00€' },
      { n: 'Belvedere', p: '15,00€' }, { n: 'Grey Goose', p: 'Por botella' } ] },
    { title: 'Whisky', items: [
      { n: 'J&B', p: '7,50€' }, { n: 'Cutty Sark', p: '7,50€' }, { n: 'White Label', p: '7,50€' },
      { n: 'DYC «8»', p: '8,00€' }, { n: 'Red Label', p: '8,00€' }, { n: "Ballantine's", p: '8,00€' },
      { n: 'Black Label', p: '10,00€' }, { n: "Jack Daniel's", p: '10,00€' },
      { n: "Jack Daniel's Manzana / Honey", p: '10,00€' }, { n: 'Chivas «12»', p: '13,00€' },
      { n: 'Cardhu «12»', p: '13,00€' }, { n: 'Macallan «12»', p: '15,00€' }, { n: 'Chivas «18»', p: '15,00€' } ] },
    { title: 'Licores', note: 'Suplementos: Red Bull +1€ · Zumo de naranja +2€ · Granadina +1€', items: [
      { n: 'Ron Malibú', p: '8,00€' }, { n: 'Jägermeister', p: '8,00€' }, { n: 'Amaretto', p: '8,00€' },
      { n: 'Disaronno', p: '8,00€' }, { n: 'Licor 43', p: '8,00€' } ] }
  ],
  'Cervezas y vinos': [
    { title: 'Cerveza', items: [
      { n: 'Estrella Damm', p: '3,00€' }, { n: 'Heineken', p: '3,00€' }, { n: 'Turia', p: '3,00€' },
      { n: 'IPA', p: '3,00€' }, { n: 'Bohemia', p: '3,00€' }, { n: 'Voll-Damm', p: '3,00€' },
      { n: 'Alhambra', p: '3,00€' }, { n: 'Coronita', p: '3,50€' }, { n: 'Jarra', p: '4,00€' },
      { n: 'Damm Damm + bravas', d: 'Hasta las 23:00', p: '5,50€' } ] },
    { title: 'Vino y derivados', price: 'copas', items: [
      { n: 'Vino Tinto', p: '3,50€' }, { n: 'Vino Blanco', p: '3,50€' }, { n: 'Vino Rosado', p: '3,50€' },
      { n: 'Tinto de Verano', p: '3,90€' }, { n: 'Copa de Cava', p: '3,50€' }, { n: 'Sidra', p: '4,95€' },
      { n: 'Sangría de Vino', p: '5,95€' }, { n: 'Sangría de Cava', p: '5,95€' }, { n: 'Calimocho', p: '7,00€' } ] },
    { title: 'Por botella', items: [
      { n: 'Vino Tinto', p: '14,00€' }, { n: 'Vino Blanco', p: '14,00€' },
      { n: 'Vino Rosado', p: '15,00€' }, { n: 'Cava', p: '18,00€' } ] }
  ],
  'Refrescos y café': [
    { title: 'Refrescos', items: [
      { n: 'Agua', p: '3,00€' }, { n: 'Agua con gas', p: '3,20€' }, { n: 'Coca-Cola / Zero', p: '3,50€' },
      { n: 'Nestea / Maracuyá', p: '3,50€' }, { n: 'Sprite', p: '3,50€' }, { n: 'Fanta Limón', p: '3,50€' },
      { n: 'Fanta Naranja', p: '3,50€' }, { n: 'Lipton', p: '3,50€' }, { n: 'Red Bull', p: '3,50€' },
      { n: 'Monster 0,5 cl', p: '3,95€' } ] },
    { title: 'Café', price: 'hasta 22:00', items: [
      { n: 'Café Solo', p: '2,50€' }, { n: 'Cortado', p: '3,00€' }, { n: 'Café con Leche', p: '3,50€' },
      { n: 'Bombón', p: '3,50€' }, { n: 'Carajillo', p: '3,95€' }, { n: 'Trifásico', p: '3,95€' } ] },
    { title: 'Batidos', price: 'hasta 22:00', items: [
      { n: 'Oreo', p: '8,00€' }, { n: 'Kinder Bueno', p: '8,00€' }, { n: 'KitKat', p: '8,00€' }, { n: 'Lotus', p: '8,00€' } ] },
    { title: 'Infusiones', items: [
      { n: 'Manzanilla', p: '3,50€' }, { n: 'Menta Poleo', p: '3,50€' }, { n: 'Frutos Rojos', p: '3,50€' },
      { n: 'Té Verde', p: '3,50€' }, { n: 'Té Negro', p: '3,50€' }, { n: 'Cúrcuma', p: '3,50€' },
      { n: 'Té de la Casa', d: 'Menta, té verde, azúcar y miel', p: '4,95€' } ] }
  ]
};
})();
