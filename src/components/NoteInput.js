class NoteInput extends HTMLElement {
    connectedCallback() {
        this.render();
        this._setupValidation();
    }
    
    render() {
        this.innerHTML = `
             <div class="px-6 bg-sky-900 max-w-2xl h-full mx-auto py-8 my-auto rounded-lg">
                <h2 class="text-white text-2xl font-bold md:text-[20px] sm:text-[18px]">Add Notes</h2>
                <form id="noteForm" class="flex flex-col justify-center text-white  space-y-2">
                    <div class="flex flex-col">
                        <label for="title" class="py-2">Title</label>
                        <input type="text" id="title" name="title" placeholder="Input title" class="p-2 border rounded-md focus:outline-none focus:border-sky-950 focus:transition-all" required>
                        <span id="titleError" class="text-red-500"></span> <!-- Pesan kesalahan untuk judul -->
                    </div>
                    <div class="flex flex-col">
                        <label for="body" class="py-2">Notes</label>
                        <textarea id="body" name="body" placeholder="Input notes..." class="p-2 border rounded-md focus:outline-none focus:border-sky-950 focus:transition-all" required></textarea>
                        <span id="bodyError" class="text-red-500"></span> <!-- Pesan kesalahan untuk catatan -->
                    </div>
                    <button type="submit" id="saveButton" class="text-white bg-blue-500 rounded-md my-2 p-2 hover:bg-blue-600 transition-all">Save</button>
                </form>
            </div>
        `;
        
        this.querySelector('#noteForm').addEventListener('submit', this._onSubmit.bind(this));
    }

    _setupValidation() {
        const titleInput = this.querySelector('#title');
        const bodyInput = this.querySelector('#body');
        const titleError = this.querySelector('#titleError');
        const bodyError = this.querySelector('#bodyError');
        const saveButton = this.querySelector('#saveButton');
        
        // Helper function to validate the entire form
        const validateForm = () => {
            const isTitleValid = titleInput.value.trim().length >= 3;
            const isBodyValid = bodyInput.value.trim().length >= 10;
            
            saveButton.disabled = !(isTitleValid && isBodyValid);
        };
        
        // Validate title on input
        titleInput.addEventListener('input', () => {
            const value = titleInput.value.trim();
            titleError.textContent = ''; // Reset pesan kesalahan
            
            if (value.length < 3) {
                titleError.textContent = 'Title must be at least 3 characters';
                titleInput.classList.add('invalid');
            } else {
                titleInput.classList.remove('invalid');
            }
            
            validateForm();
        });
        
        // Validate body on input
        bodyInput.addEventListener('input', () => {
            const value = bodyInput.value.trim();
            bodyError.textContent = ''; // Reset pesan kesalahan
            
            if (value.length < 10) {
                bodyError.textContent = 'Notes must be at least 10 characters';
                bodyInput.classList.add('invalid');
            } else {
                bodyInput.classList.remove('invalid');
            }
            
            validateForm();
        });
    }
    
    _onSubmit(event) {
        event.preventDefault();
        const titleInput = this.querySelector('#title');
        const bodyInput = this.querySelector('#body');
        
        const noteData = {
            title: titleInput.value,
            body: bodyInput.value
        };
        
        this.dispatchEvent(new CustomEvent('note-submit', {
            detail: noteData,
            bubbles: true
        }));
        
        titleInput.value = '';
        bodyInput.value = '';
    }
}

customElements.define('note-input', NoteInput);