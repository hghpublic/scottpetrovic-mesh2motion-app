import { UI } from './UI'

export class SettingsDropdownManager {
  private readonly ui: UI = UI.getInstance()
  private initialized: boolean = false
  private is_open: boolean = false

  constructor () {
    this.initialize()
  }

  private initialize (): void {
    if (this.initialized) {
      return
    }

    const toggle_button = this.ui.dom_settings_toggle_button
    const dropdown_container = this.ui.dom_settings_dropdown_container
    const dropdown_content = this.ui.dom_settings_dropdown_content

    if (toggle_button === null || dropdown_container === null || dropdown_content === null) {
      return
    }

    this.initialized = true

    toggle_button.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      this.toggle_dropdown()
    })

    document.addEventListener('click', (event: MouseEvent) => {
      if (!this.is_open) {
        return
      }

      const target = event.target as Node | null
      if (target === null) {
        return
      }

      if (!dropdown_container.contains(target)) {
        this.close_dropdown()
      }
    })

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close_dropdown()
      }
    })
  }

  private open_dropdown (): void {
    const toggle_button = this.ui.dom_settings_toggle_button
    const dropdown_content = this.ui.dom_settings_dropdown_content

    if (toggle_button === null || dropdown_content === null) {
      return
    }

    this.is_open = true
    dropdown_content.hidden = false
    toggle_button.setAttribute('aria-expanded', 'true')
  }

  private close_dropdown (): void {
    const toggle_button = this.ui.dom_settings_toggle_button
    const dropdown_content = this.ui.dom_settings_dropdown_content

    if (toggle_button === null || dropdown_content === null) {
      return
    }

    this.is_open = false
    dropdown_content.hidden = true
    toggle_button.setAttribute('aria-expanded', 'false')
  }

  private toggle_dropdown (): void {
    if (this.is_open) {
      this.close_dropdown()
    } else {
      this.open_dropdown()
    }
  }
}