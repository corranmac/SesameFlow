# SesameFlow

**SesameFlow** is an open source visual pipeline builder for scholarly data aggregation, filtering, and search. It's built with [ReactFlow](https://reactflow.dev/) and [Dexie.js](https://dexie.org/), and is currently in **active development**.

This project aims to create a flexible, web-first, no-code tool for constructing workflows that pull from academic APIs, filter and combine their outputs, and provide persistent and forkable flows in just a few clicks.

🧪 Built under **Sesame Science** — SesameFlow is a foundational piece of the vision for modular, open infrastructure for academic discovery and analysis.

---

##  Status: Early Development

SesameFlow is still evolving. You might run into broken features, missing components, or placeholder logic. **As a result, it is not yet ready for use in production for literature reviews** — but it’s a great time give feedback and get involved!

View a hosted toy demo here: https://sesameflow.pages.dev/

---

##  What It Can Do (So Far)

- Visual design of scholarly data workflows via **ReactFlow**
- Nodes that fetch and filter articles through the OpenAlex API
- State persistance for multiple workflows stored in localStorage using zustand and metadata stored in a db schema based on DataCite using **Dexie.js** (IndexedDB)

---

## Why SesameFlow?

Research tools today are often commercial, black-boxed, and inflexible often offering aged UX. SesameFlow aims to offer a more modern :

- 📊 **Transparent**: Search logic is visual and reproducible
- 🧩 **Composable**: Nodes act like building blocks
- 🔒 **Open**: Your queries, your data — no server required

---

## Tech Stack

- **React** + **TypeScript**
- **ReactFlow** – for visual workflows
- **Dexie.js** – for client-side persistence
- **Zustand** – global state management

---

## 🚀 Getting Started

```bash
git clone https://github.com/sesame-science/sesameflow.git
cd sesameflow
npm install
npm run dev
```

---

## Contributing

Im welcoming contributors with some experience with React and a passion for open source research software! Here’s how to jump in:

### Good places to start

- Add a new **Node Type** (e.g., a data filter or visualizer)
- Improve **Node UI** with TypeScript types and inputs
- Help wire up **search and data aggregation**
- Enhance **flow saving/loading** logic in the lead up towards offering workflow state storage both locally and on server
- Build **example flows** based on existing literature reviews or for exploratory **living** views of research landscapes. 

### Code Structure

- `src/nodes/` – Registry of node types and React components
- `src/store/` – Zustand store logic for flows and state
- `src/database/` – Dexie.js logic for per-node data
- `src/components/` – UI elements (panel, sidebar, editor)

### Tips

- Use `FlowStore.setActiveFlow(flowID)` to control which flow is running
- Each node can register its own Dexie store via a helper like `getNodeStore(nodeId)`
- Nodes can emit results or intermediate data that others consume

---

## Roadmap

- [ ] Basic search interface with node-wise querying
- [ ] Reusable components for use across the app
- [ ] Server sync + sharing
- [ ] NLP/embedding tools for exploring the landscape of research areas
- [ ] Exportable flows for collaboration or publication

---

## Get In Touch

If you’re building in this space, interested in embedding SesameFlow in your research process, or just curious — I'd love to hear your thoughts. Open an issue or find me @corranmac.blsky.social

---
