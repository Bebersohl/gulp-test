import $ from 'jquery';

let counter = 0;
$('#btn-counter').on('click', () => {
  counter++;
  $('#count').text(counter);
});
const boyah = (str = "bubbah") => {
  console.log(`es6 working? ${str}`);
}
boyah();
