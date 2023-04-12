/*const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
}
*/

// DELETE method for removing stocks from watchlist
const deleteButton = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/stocks/${id}`, {
      method: 'DELETE',
    });
    console.log(response);

    if (response.ok) {
      document.location.replace('/watchlist');
    } else {
      alert('Failed to delete project');
    }
  }
};

document.querySelectorAll('[data-id]').forEach((element) => {
  element.addEventListener('click', deleteButton);
});
