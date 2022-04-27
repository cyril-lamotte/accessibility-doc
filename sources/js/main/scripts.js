
// Get all checkboxes.
const checkboxList = document.querySelectorAll('.criteria-radio input[type="radio"]');
const form = document.querySelector('form');
const hintList = document.querySelectorAll('.hint');

checkboxList.forEach((cb) => {
  // Get the id as reference.

  cb.addEventListener('change', () => {
    const id = cb.getAttribute('id');

    // Hide all hints.
    hintList.forEach((hint) => {
      const ref = hint.getAttribute('data-a11y-ref');
      hint.classList.remove('is-visible');
      form.classList.remove(ref);
    });

    const relatedHintList = document.querySelectorAll(`.hint[data-a11y-ref="${id}"]`);
    relatedHintList.forEach((hint) => {
      hint.classList.add('is-visible');
      form.classList.add(id);
    });
  });
});


// Targeting email fields and text fields with "email" name.
const emailFieldList = document.querySelectorAll('[type="email"], [type="text"][name="email"]');
emailFieldList.forEach((field) => {
  field.addEventListener('input', (e) => {
    field.setCustomValidity('');
    field.checkValidity();
  });

  field.addEventListener('invalid', (e) => {
    if (field.value === '') {
      field.setCustomValidity('L\'email est requis.');
    } else {
      field.setCustomValidity('L\'email est incorrect, le caractère \'@\' est manquant, ex : jean.dupond@exemple.com');
    }
  });
});
