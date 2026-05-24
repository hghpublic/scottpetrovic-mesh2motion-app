export class DownloadSuccessDialog {
  private dialog_element: HTMLDivElement | null = null
  private readonly content_html = `


    <div class="download-success-dialog-content">
      <h2>Export Successful</h2>
      <div class="download-success-dialog-body">
        <div class="download-success-section">
          <h3>How was your experience</h3>
          <p>Quick question: Are you enjoying Mesh2Motion? We'd love to hear your feedback!
            It only takes 2 minutes to answer our brief survey.</p>

          <button>Take Survey</button>
        </div>

        <div class="download-success-section">
          <h3>Support the Project</h3>
          <p>If you find Mesh2Motion helpful, consider donating to help us keep improving the tool
            and adding new features.</p>
          <a href="https://support.mesh2motion.org/" class="button">Learn More</a>
        </div>

        <div class="download-success-section">
          <h3>Join Our Community</h3>
          <p>Have questions or want to share your creations? Join us on Discord to connect with
            other animators and get support.</p>
          <a href="https://discord.gg/UChE936q7y" target="_blank" class="button">
            Join Discord Server
          </a>
        </div>
      </div>
      <a href="#" class="download-success-dialog-close">Not today, maybe tomorrow</a>
    </div> 
  `

  constructor (private readonly options?: { onClose?: () => void }) {}

  public show (): void {
    this.remove()
    this.dialog_element = document.createElement('div')
    this.dialog_element.className = 'download-success-dialog-overlay'

    // HTML template for the content
    this.dialog_element.innerHTML = this.content_html
    document.body.appendChild(this.dialog_element)

    // Close button handler
    const close_button = this.dialog_element.querySelector('.download-success-dialog-close')
    close_button?.addEventListener('click', () => { this.remove() })

    // Close on overlay click
    this.dialog_element.addEventListener('click', (e) => {
      if (e.target === this.dialog_element) this.remove()
    })
  }

  private remove (): void {
    if (this.dialog_element && this.dialog_element.parentNode) {
      this.dialog_element.parentNode.removeChild(this.dialog_element)
      this.dialog_element = null
      if (this.options?.onClose) this.options.onClose()
    }
  }
}
