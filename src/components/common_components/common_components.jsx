export function setMovieCardsTop() {
  let top_controls_row =document.getElementById('top-text-and-controls-row')
  let top_row_height = window.getComputedStyle(top_controls_row).height;
  let cards_row = document.getElementsByClassName('movie-cards-row')[0];
  cards_row.style.top = top_row_height;
}
