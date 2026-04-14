
# 🖥️ Lite Code Box 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built With](https://img.shields.io/badge/Built%20With-Ace%20Editor-2b2b2b)](https://ace.c9.io/)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)](https://github.com/MuGrahiman/LiteCodeBox)
[![Status](https://img.shields.io/badge/Status-Stable-green)](https://github.com/MuGrahiman/LiteCodeBox)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?logo=githubpages)](https://mugrahiman.github.io/LiteCodeBox/)

> **Zero-setup, portable code editor for teaching and learning web development**  
> Write HTML, CSS, and JavaScript with instant preview — all in a single file. No servers, no logins, no installations. Just code ✨

**[👉 Try Live Demo Now](https://mugrahiman.github.io/LiteCodeBox/)** 🌐

---

## 📋 Table of Contents

- [🖥️ Lite Code Box](#️-lite-code-box)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🚀 Quick Start](#-quick-start)
  - [🌐 Live Demo](#-live-demo)
  - [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
  - [👥 Who Is This For?](#-who-is-this-for)
  - [🛠️ Usage Examples](#️-usage-examples)
    - [As a Teaching Tool](#as-a-teaching-tool)
    - [As a Homework Sandbox](#as-a-homework-sandbox)
  - [📁 Sample Projects](#-sample-projects)
    - [JSON File Structure](#json-file-structure)
    - [How to Use Examples](#how-to-use-examples)
  - [📂 Project Structure](#-project-structure)
  - [🎯 Learning with Examples](#-learning-with-examples)
  - [🤝 Contributing](#-contributing)
    - [Development Guidelines](#development-guidelines)
  - [📄 License](#-license)
  - [📞 Support \& Contact](#-support--contact)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [⭐ Show Your Support](#-show-your-support)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Tabbed Editing** | Switch between HTML, CSS, and JavaScript with syntax highlighting |
| **Live Preview** | Real-time output in a sandboxed iframe |
| **Save/Load** | Export work as JSON files or load examples |
| **Auto-Restore** | Automatically saves progress to localStorage |
| **Keyboard Shortcuts** | Boost productivity with Ctrl+S and Ctrl+Enter |
| **Validation Panel** | Basic JavaScript assignment checking |
| **Accessible** | ARIA-compliant with keyboard navigation |

---

## 🚀 Quick Start

**No installation required!** Lite Code Box runs entirely in your browser.

```bash
# Option 1: Use online version (easiest)
# Just visit: https://mugrahiman.github.io/LiteCodeBox/

# Option 2: Clone and run locally
git clone https://github.com/MuGrahiman/LiteCodeBox.git

# Open the HTML file in any modern web browser
# That's it — start coding immediately!
```

---

## 🌐 Live Demo

**Try it now:** [Lite Code Box](https://mugrahiman.github.io/LiteCodeBox/)

No download required! The live version includes:
- ✅ Full functionality of the editor
- ✅ All example projects pre-loaded in the `examples/` directory
- ✅ Instant preview and real-time editing
- ✅ Save/Load capabilities

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` (or `Cmd + S`) | Save current work as JSON |
| `Ctrl + Enter` (or `Cmd + Enter`) | Run/Preview your code |

---

## 👥 Who Is This For?

- **Teachers/Instructors** - Create interactive coding lessons without infrastructure
- **Students** - Practice HTML/CSS/JS fundamentals instantly
- **Bootcamps & Workshops** - Zero-setup sandbox for exercises
- **Self-learners** - Experiment and build projects immediately

---

## 🛠️ Usage Examples

### As a Teaching Tool

```javascript
// Load a starter template for students
// Students edit and save their work
// Auto-restore prevents lost progress
```

### As a Homework Sandbox

```markdown
1. Assign students to build a specific component
2. Students export their work as JSON
3. Submit via your LMS or email
```


---

## 📁 Sample Projects

Four example JSON files are included in the `examples/` directory for quick loading in the code editor:

| File | Description |
|------|-------------|
| **Color Switcher.json** | Interactive app that changes background color when buttons are clicked |
| **RGB Mixer.json** | Mix red, green, and blue values to create custom colors |
| **Random Quote Generator.json** | Displays random quotes with each click |
| **Todo List.json** | Add, complete, and delete tasks in a functional todo app |

### JSON File Structure

Each example file contains the following key-value pairs:

```json
{
  "version": 1,
  "kind": "web-only",
  "assignment": "description of the task",
  "test": "",
  "html": "<h2>App Title</h2>\n<button>Click me</button>",
  "css": "body { font-family: sans-serif; }",
  "js": "console.log('App ready!');"
}
```

### How to Use Examples

1. Launch **Lite Code Box** in your browser ([Live Demo](https://mugrahiman.github.io/LiteCodeBox/))
2. Click the **Load** button in the editor
3. Navigate to the `examples/` directory
4. Select any JSON file (e.g., `Color Switcher.json`)
5. The HTML, CSS, and JavaScript will automatically populate the editor
6. See the live preview instantly!

---

## 📂 Project Structure

```
LiteCodeBox/
├── index.html              # Main editor file
├── LICENSE                 # MIT License
├── README.md               # Documentation
└── examples/               # Sample JSON files
    ├── Color Switcher.json
    ├── RGB Mixer.json
    ├── Random Quote Generator.json
    └── Todo List.json
```

---

## 🎯 Learning with Examples

These examples help students understand:
- **DOM Manipulation** - Adding event listeners and modifying styles
- **State Management** - Tracking todos, colors, or quotes
- **Event Handling** - Responding to button clicks and user input
- **CSS Styling** - Creating visually appealing interfaces

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create a branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Maintain the single-file architecture
- Keep dependencies minimal and CDN-based
- Ensure accessibility (ARIA labels, keyboard nav)
- Test in major browsers (Chrome, Firefox, Safari, Edge)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for details.

---

## 📞 Support & Contact

- **Live Demo**: [Lite Code Box](https://mugrahiman.github.io/LiteCodeBox/)
- **Issues**: [GitHub Issues](https://github.com/MuGrahiman/LiteCodeBox/issues)
- **Repository**: [MuGrahiman/LiteCodeBox](https://github.com/MuGrahiman/LiteCodeBox)

---

## 🙏 Acknowledgments

- [Ace Editor](https://ace.c9.io/) - Powerful code editing component
- Built with vanilla HTML/CSS/JS - No frameworks required
- Hosted on **GitHub Pages** for free, worldwide access

---

## ⭐ Show Your Support

If you find this useful, please give it a ⭐ on GitHub!

**Live Demo:** [Lite Code Box](https://mugrahiman.github.io/LiteCodeBox/)
