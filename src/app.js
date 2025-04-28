import './components/AppBar.js';
import './components/UserInfo.js';
import './components/NoteInput.js';
import './components/NoteList.js';
import './components/NoteItem.js';
import './components/AppFooter.js';
import './output.css';

// Manajemen data catatan
const noteData = {
    
    getNotes() {
        return this.notes;
    },
    
    addNote({ title, body }) {
        const newNote = {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
        };
        
        this.notes = [...this.notes, newNote];

        // Simpan ke localStorage setiap kali ada note baru
        this.saveToLocalStorage();

        this._triggerEvent();
        return newNote;
    },

    saveToLocalStorage() {
      localStorage.setItem('notes-data', JSON.stringify(this.notes));
    },
  
    // Fungsi untuk memuat data dari localStorage
    loadFromLocalStorage() {
        const storedNotes = localStorage.getItem('notes-data');
        if (storedNotes) {
            this.notes = JSON.parse(storedNotes);
        }
    },
    
    _triggerEvent() {
        document.dispatchEvent(new Event('notes-changed'));
    }
};

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah ada data di localStorage dan muat jika ada
    noteData.loadFromLocalStorage();
    
    const noteListElement = document.querySelector('note-list');
    noteListElement.notes = noteData.getNotes();
    
    const noteInputElement = document.querySelector('note-input');
    noteInputElement.addEventListener('note-submit', (event) => {
      const { title, body } = event.detail;
      // Cek validitas sebelum menambahkan catatan
      if (title && title.trim().length < 3) {
        alert('Pastikan judul memiliki minimal 3 karakter.');
      } else if (body && body.trim().length < 10) {
        alert('Pastikan catatan memiliki minimal 10 karakter.');
      } else {
        noteData.addNote(event.detail);
      }
    });
    
    document.addEventListener('notes-changed', () => {
        noteListElement.notes = noteData.getNotes();
    });
});