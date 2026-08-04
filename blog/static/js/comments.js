document.addEventListener('DOMContentLoaded', () => {
  const commentForm = document.querySelector('#comment-form');

  if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
      const textarea = commentForm.querySelector('textarea');
      if (textarea && textarea.value.trim() === '') {
        e.preventDefault();
        alert('Please write a comment before submitting.');
        textarea.focus();
      }
    });
  }
});