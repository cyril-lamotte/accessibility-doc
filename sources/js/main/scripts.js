const buttonList = document.querySelectorAll('.controls button');
buttonList.forEach((button) => {
  const id = button.getAttribute('id');

  button.addEventListener('click', () => {
    document.body.classList.toggle(id);
  });
});

const toggleHints = document.getElementById('toggle-hints');
toggleHints.addEventListener('click', () => {
  document.body.classList.toggle('show-hints');
});
