class NoteItem extends HTMLElement {
    connectedCallback() {
        this.title = this.getAttribute('title') || '';
        this.date = this.getAttribute('date') || '';
        this.body = this.getAttribute('body') || '';
        this.render();
    }
    
    render() {
        this.innerHTML = `
            <div class="bg-sky-950 bg-opacity-50 p-4 rounded-lg md:text-[18px] sm:text-[14px]">
                <h3 class="font-bold">${this.title}</h3>
                <p class="italic text-[16px]">${this.date}</p>
                <div class="h-0.5 w-full bg-white my-2"></div>
                <p class="text-[16px]">${this.body}</p>
            </div>
        `;
    }
}

customElements.define('note-item', NoteItem);