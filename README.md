<div align="center">

# 🤖 AI Request Desk

### Centralized AI Resource Management Platform for Enterprise Teams

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-00C853?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-consulting--ankur0609.replit.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-83.9%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

**Streamline AI tool access, track usage, and manage approvals across your organization**

[Live Demo](https://ai-consulting--ankur0609.replit.app) • [Report Bug](https://github.com/ankurkushwaha9/ai-consulting/issues) • [Request Feature](https://github.com/ankurkushwaha9/ai-consulting/issues)

</div>

---

## 🎯 Problem Statement

Organizations struggle with:
- **Scattered AI Tools** - Teams use different AI tools without coordination
- **No Usage Visibility** - Leadership can't track AI adoption or ROI
- **Security Concerns** - Unmanaged AI usage creates compliance risks
- **Budget Overruns** - Multiple subscriptions without oversight

## 💡 Solution

**AI Request Desk** provides a unified platform where employees can:
- Request access to AI tools through a streamlined workflow
- Track their AI usage and productivity gains
- Get approvals from managers with full audit trails
- Access a curated catalog of approved AI agents

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📝 **Request Management** | Submit, track, and manage AI tool access requests |
| 🏢 **Multi-Department Support** | Sales, Marketing, Customer Success, Product, Engineering |
| 📊 **Usage Analytics** | Monitor AI tool adoption across the organization |
| ✅ **Approval Workflow** | Manager approval system with notifications |
| 🔐 **User Authentication** | Secure session-based authentication with Passport.js |
| 🤖 **AI Agent Catalog** | Browse and request access to approved AI tools |
| 🎨 **Modern UI** | Beautiful, responsive interface with Tailwind CSS |
| ⚡ **Real-time Updates** | WebSocket support for live notifications |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Pages   │  │Components│  │  Hooks   │  │  TanStack Query  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTP / WebSocket
┌─────────────────────────────▼───────────────────────────────────┐
│                      SERVER (Express + Node.js)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Routes  │  │   Auth   │  │ Storage  │  │    WebSocket     │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Drizzle ORM
┌─────────────────────────────▼───────────────────────────────────┐
│                        DATABASE (PostgreSQL)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Users   │  │ Requests │  │ AI Agents│  │    Sessions      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Styling |
| Radix UI | Accessible Components |
| TanStack Query | Server State Management |
| Framer Motion | Animations |
| Wouter | Routing |
| React Hook Form | Form Handling |
| Zod | Schema Validation |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Web Framework |
| PostgreSQL | Database |
| Drizzle ORM | Database ORM |
| Passport.js | Authentication |
| Express Session | Session Management |
| WebSocket (ws) | Real-time Communication |

---

## 📁 Project Structure

```
ai-consulting/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   └── ui/           # Radix UI + shadcn/ui components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Page components
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   └── public/               # Static assets
│
├── server/                    # Backend Express application
│   ├── auth.ts               # Authentication logic
│   ├── db.ts                 # Database connection
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Data access layer
│   └── vite.ts               # Vite dev server integration
│
├── shared/                    # Shared code between client/server
│   └── schema.ts             # Database schema & types
│
├── drizzle.config.ts         # Drizzle ORM configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **PostgreSQL** database
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankurkushwaha9/ai-consulting.git
   cd ai-consulting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/ai_consulting
   
   # Session
   SESSION_SECRET=your-super-secret-session-key
   
   # Environment
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5000`

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript type checking |
| `npm run db:push` | Push database schema changes |

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `SESSION_SECRET` | Secret key for session encryption | ✅ Yes |
| `NODE_ENV` | Environment (development/production) | ❌ No |

---

## 🗺️ Roadmap

- [x] Landing page with feature sections
- [x] User authentication system
- [x] PostgreSQL database integration
- [x] Request management API
- [x] Department-based navigation
- [ ] Admin dashboard
- [ ] Usage analytics dashboard
- [ ] Email notifications
- [ ] AI agent marketplace
- [ ] Role-based access control
- [ ] Audit logging
- [ ] API rate limiting

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ankur Kushwaha**

- 🌐 GitHub: [@ankurkushwaha9](https://github.com/ankurkushwaha9)
- 📚 AI Learning Journey: [ai-learning-os](https://github.com/ankurkushwaha9/ai-learning-os)
- 🎨 ComicHire AI: [cold-outreach-comichire-ai](https://github.com/ankurkushwaha9/cold-outreach-comichire-ai)

---

## 🙏 Acknowledgments

- [Replit](https://replit.com/) for the development environment
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database access
- [TanStack Query](https://tanstack.com/query) for powerful data fetching

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with ❤️ as part of my AI Learning Journey**

</div>
