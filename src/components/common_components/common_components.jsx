export function setMovieCardsTop() {
  console.log('setMovieCardsTop()');
  try{
    let top_controls_row =
      document.getElementsByClassName('top-controls-row')[0];
    let top_row_height = window.getComputedStyle(top_controls_row).height;
    let cards_row = document.getElementsByClassName('movie-cards-row')[0];
    cards_row.style.top = top_row_height;
  } catch{} // i.e., no top-controls row was found
}