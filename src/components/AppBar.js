class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <header class="flex justify-between items-center bg-sky-900 text-white text-2xl font-bold w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-28 py-4 top-0 left-0 right-0">
                <img src="../../assets/notebook.png" alt="Logo Notes App" class="ml-24 w-10 h-10">
                <h1 class="text-2xl font-bold font-mono pl-4 grow">Notes App</h1>                
            </header>
        `;
  }
}

customElements.define("app-bar", AppBar);
