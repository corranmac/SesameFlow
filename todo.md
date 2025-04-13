# 🛠️ Developer Onboarding & Documentation Guide

---

## 📘 1. Improve the readme `README.md`

A good top-level `README.md` should:

- ✅ Summarize the project’s **purpose and scope**
- 🔧 Explain **how to run the app** (dev + prod)
- 🗂️ Describe the **directory structure** (an abbreviated tree works great!)
- 🌟 Highlight **core components and entry points**
  - _Examples: `Canvas.jsx`, `Workspace.jsx`, plugin system_
- 👋 List **key files for new contributors**
  - Especially useful for **nodes**, **layout**, and the **plugin system**

### 🗂️ Example: Key Directories
```plaintext
flow/
├── core/base/nodes            # Core node components (e.g., FilterType, SinkType)
├── plugins                    # Add-on functionality, contributed as independent modules
└── registry/flowNodeRegistry.js  # Central place where all nodes get registered
```

---

## 🧾 2. Use Typedoc / JSDoc / TSDoc for Component Docs

Add comments to major modules using JSDoc or TSDoc to auto-generate documentation.

 * FilterType renders a filtering logic node for the query canvas.
 * Accepts props from React Flow and data-store context.
 */
\`\`\`

🛠️ If using TypeScript, consider using **TypeDoc** to generate browsable component docs.

---

## 🔌 3. Document the Plugin Architecture

Create a plugin guide in `docs/plugins.md` or `docs/guide/plugin-guide.md`.

Explain:

- 📦 **How to create a plugin**
- 🧱 Required structure (`plugin.config.js`, node components, services)
- 🔗 How plugins **register themselves**
- 🧠 How plugins can **define new nodes**

---

## 🧠 4. Record ADRs (Architecture Decision Records)

Track key architectural choices in a `/docs/adr/` directory. Each `.md` file should explain:

- ❓ **Why** a decision was made  
- 🧩 Examples:
  - Why use **React Flow**?
  - Why choose **dexiestore** for storage?
  - Why separate nodes into **core**, **OpenAlex**, and **plugins**?

> ✏️ Use [log4brains](https://github.com/thomvaill/log4brains) or write markdown manually.

---

## 📚 5. Use Storybook for UI Component Development

Set up **Storybook** to:

- 🔍 Develop components in isolation:
  - `NodeHandles`, `FilterType`, `NodeCreationMenu`, etc.
- 📄 Document props and usage
- 🧪 Let contributors **interactively test components**

---

## 🤝 6. Create a `CONTRIBUTING.md`

Help new contributors get started by including:

- 🛠️ Setup instructions (dev environment, data mocking)
- 🗺️ File structure overview
- 🧩 How to add a **new node**, **view**, or **plugin**
- 🎨 Style guide or code conventions
- 🏷️ Issues marked as `good first issue`

---