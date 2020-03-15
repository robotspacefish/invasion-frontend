export default class TitleScreen {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <div id="title-screen">
        <h1 id="title">Invasion!</h1>
        <p>Press [SPACEBAR] to Start<p>
      </div>
    `
  }
}