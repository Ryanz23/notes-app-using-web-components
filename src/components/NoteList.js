import notes from '../data/api/notes.js'
class NoteList extends HTMLElement {
    constructor() {
        super();
        this._notes = [];
    }
    
    set notes(notes) {
        this._notes = notes;
        this.render();
    }
    
    async connectedCallback() {
        await this.loadNotes();
    }

    async loadNotes() {
        try {
            const notesData = await notes.getNotes();
            this.notes = notesData; // Set catatan yang diambil dari API
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    }
    
    render() {
        this.innerHTML = `
            <div class="grid grid-cols-3 text-white gap-2 p-2">
                ${this._notes.length > 0 
                    ? this._notes.map(note => `
                        <note-item 
                            id="${note.id}"
                            title="${note.title}"
                            date="${new Date(note.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}"
                            body="${note.body}"
                            class="border border-sky-950 rounded-lg p-2"
                        ></note-item>
                    `).join('')
                    : '<p class="empty-notes" class="text-white">Tidak ada catatan</p>'
                }
            </div>
        `;
    }
}

customElements.define('note-list', NoteList);