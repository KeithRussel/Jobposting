class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.company = document.querySelector('#companyInput');
        this.position = document.querySelector('#positionInput');
        this.description = document.querySelector('#jobDescription');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('#post-submit');
    }

    // Show all posts
    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="d-flex justify-content-end settings">
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>

                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>
                    <h5 class="card-header">${post.company}</h5>
                    
                    <div class="card-body">
                        <h5 class="card-title">${post.position}</h5>
                        <p class="card-text">${post.description}</p>
                        <a class="btn btn-primary" id="get">Go to main page</a>
                    </div>
                </div>
            `;
        });

        this.post.innerHTML = output;
    }

    // Show alert message
    showAlert(message, className) {
        this.clearAlert();

        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.postContainer');
        // Get posts
        const mainTitle = document.querySelector('.main-title');
        // Insert alert div
        container.insertBefore(div, mainTitle);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // Clear Alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }

    // Clear all fields
    clearFields() {
        this.company.value = '';
        this.position.value = '';
        this.description.value = '';
    }

    clearIdInput() {
        this.idInput.value = '';
    }

    fillForm(data) {
        this.idInput.value = data.id;
        this.company.value = data.company;
        this.position.value = data.position;
        this.description.value = data.description;

        this.changeFormState('edit');
    }
    // changeFormState() {
    //     console.log('Change Form State');
    // }

    changeFormState(type) {
        if(type === 'edit') {
            // Create text button
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning my-3 updatePost';

            // Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // Get parent
            const fillUp = document.querySelector('.fill-up');
            // Get element to insertbefore
            const test = document.querySelector('.test');
            // Insert cancel button
            fillUp.insertBefore(button, test);
            console.log('Type Edit');
            this.editDisable();
        } else {
            this.postSubmit.textContent = 'Submit';
            this.postSubmit.className = 'post-submit btn btn-primary my-3 addPost';

            // Remove cancel button if it's there
            if(document.querySelector('post-cancel')) {
                document.querySelector('post-cancel').remove();
            }
            // Clear id method
            this.clearIdInput();
            // Clear fields method
            this.clearFields();
            console.log('Type Add');
        }
    }

    editDisable() {
        const updateBtn = document.querySelector('.post-submit');

        if(updateBtn.classList.contains('updatePost')) {
            const links = document.querySelectorAll('.settings .edit');

            // links.className = 'not-active';

            links.forEach(function(link) {
                link.className = 'not-active edit card-link';
            });
            console.log(true);
        } else {
            console.log(false);
        }
    }
}

export const ui = new UI();