import { ui } from './ui.js';

  // Event listeners
  // Listen for get posts
  document.addEventListener('DOMContentLoaded', getPosts);
  // Listen for add post
  document.querySelector('.post-submit').addEventListener('click', submitPosts);
  // Listen for delete post
  document.querySelector('#posts').addEventListener('click', deletePost);
  // Listen for edit post
  document.querySelector('#posts').addEventListener('click', enableEdit);

//   document.getElementById('sim').addEventListener('click', getData);
//   document.getElementById('headers').addEventListener('click', customHeaders);



// GET REQUEST
function getPosts() {
// const axios = require('axios');

axios.get('http://localhost:3000/posts')
  .then(function (response) {
    // handle success
    // console.log(response.data);
    // console.log(JSON.stringify(response));
    ui.showPosts(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}
  
// POST REQUEST
function submitPosts() {
  const id = document.querySelector('#id').value;
  const company = document.querySelector('#companyInput').value;
  const position = document.querySelector('#positionInput').value;
  const description = document.querySelector('#jobDescription').value;
  
  const data = {
    company,
    position,
    description
  }

  // Validate input
  if(company === '' || position === '' || description === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    // Check for id
    if(id === '') {
      // Create Post
      axios
      .post('http://localhost:3000/posts', data)
      .then(data => {
        getPosts();
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
      })
      .catch(error => console.log(error));
    } else {
      // Update post
      axios
      .put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(error => console.log(error));
    }
  }
}
  
  // DELETE REQUEST
function deletePost(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        ui.showAlert('Post Removed', 'alert alert-success');
        getPosts();
      })
      .catch(error => console.log(error));
    }
  }
  e.preventDefault();
}
  
  // SIMULTANEOUS DATA
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const company = e.target.parentElement.parentElement.nextElementSibling.textContent;
    const position = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0].textContent;
    const description = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling.children[1].textContent;
    
    const data = {
      id,
      company,
      position,
      description
    }

    // Fill form with current post
    ui.fillForm(data);
    console.log(company);
  }
  e.preventDefault();
}
  
  // CUSTOM HEADERS
  function customHeaders() {
    console.log('Custom Headers');
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
  }
  
  // ERROR HANDLING
  function errorHandling() {
    console.log('Error Handling');
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    console.log('Cancel Token');
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  
  // AXIOS INSTANCES
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('result').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
