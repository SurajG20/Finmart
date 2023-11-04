document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback-form');
  const formMessage = document.getElementById('form-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the form data
    const formData = new FormData(form);
    // You can use the Fetch API to send the form data to your server
    fetch('/feedback', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the response from the server for success or error
        if (data.success) {
          // Display a success message
          formMessage.textContent = 'Form submitted successfully!';
          formMessage.className = 'text-success';

          // Clear the form data
          form.reset();
        } else {
          // Display an error message
          formMessage.textContent = 'Form submission failed. Please try again.';
          formMessage.className = 'text-danger';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('subscribe-form');
  const formMessage = document.getElementById('subscribe-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    fetch('/newsletter', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          formMessage.textContent = 'Subsribed successfully!';
          formMessage.class = 'text-success';
          form.reset();
        } else {
          formMessage.textContent = 'Subscribtion failed. Please try again.';
          formMessage.className = 'text-danger';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});
