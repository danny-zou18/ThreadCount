# Seamless

## Frontend Guide: Setup & Development

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+ (comes with Node.js)

### Installation

#### Unix-based systems (macOS/Linux)

```bash
cd frontend
npm install
```

#### Windows (PowerShell)

```powershell
cd frontend
npm install
```

#### Windows (Command Prompt)

```cmd
cd frontend
npm install
```

### Running the Development Server

#### Unix-based systems (macOS/Linux)

```bash
cd frontend
npm run dev
```

#### Windows (PowerShell)

```powershell
cd frontend
npm run dev
```

#### Windows (Command Prompt)

```cmd
cd frontend
npm run dev
```

The development server will start at `http://localhost:5173`.

### Other Commands

| Command | Description |
| ------- | ----------- |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format with Prettier |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run typecheck` | Run TypeScript type checking |

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8000
```

## Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI framework |
| TypeScript (strict) | Type safety |
| Vite 7 + SWC | Build and dev server |
| React Router v7 | Client routing |
| Tailwind CSS v4 | Styling |
| Zustand | Client state |
| zod | Runtime validation |
| Vitest + React Testing Library | Testing |

## Frontend Shape

- App shell starts in `frontend/src/App.tsx` and renders `AppRoutes`.
- Route config lives in `frontend/src/routes/index.tsx`.
- Shared primitives live in `frontend/src/shared/`.
- Domain code lives in `frontend/src/features/`.

## Implemented Feature Domains

- `auth`: login, signup, session bootstrap, protected routes.
- `onboarding`: protected onboarding flow.
- `dashboard`: protected landing area after auth.
- `wardrobe`: wardrobe management UI.
- `outfit-builder`: outfit composition UI.

## Present But Not Routed

- `profile/api.ts` exists, but profile pages are not currently wired into the router.

## Layer Rules

Within a feature, dependencies flow forward only:

```text
Types -> API -> Stores -> Components -> Pages
```

Rules:

- Prefer named exports.
- Keep files under 300 lines.
- Parse API responses with zod at the boundary.
- Shared UI belongs in `frontend/src/shared/ui/`.
- Do not import another feature's components directly; share types or shared primitives instead.

## Routing

### Implemented routes

| Route | Access | Source |
| --- | --- | --- |
| `/` | Redirects to `/login` | `frontend/src/routes/index.tsx` |
| `/login` | Public | `auth` |
| `/signup` | Public | `auth` |
| `/onboarding` | Protected | `onboarding` |
| `/dashboard` | Protected | `dashboard` |
| `/wardrobe` | Protected | `wardrobe` |
| `/outfit-builder` | Protected | `outfit-builder` |
| `*` | Redirects to `/login` | `frontend/src/routes/index.tsx` |


## Overview

The Seamless backend is a Python-based FastAPI service. It acts as an orchestration layer between the frontend, Supabase, and various AI services (like fal.ai).

## Tech Stack

| Tool         | Purpose                                         |
| ------------ | ----------------------------------------------- |
| Python 3.12+ | Runtime                                         |
| FastAPI      | Web framework                                   |
| Uvicorn      | ASGI server                                     |
| Supabase-py  | Database and storage interaction (Admin)        |
| fal-python   | AI image generation (nano-banana-2/edit)        |
| Pydantic     | Data validation and settings management         |
| httpx        | Asynchronous HTTP client for downloading images |

## Project Structure

```
backend/
├── app/
│   ├── main.py              # Application entrypoint & CORS config
│   ├── config.py            # Environment settings (Pydantic)
│   ├── supabase_client.py   # Supabase Admin initialization
│   ├── api/
│   │   └── routes/
│   │       └── avatar.py    # Avatar generation endpoints
│   └── services/
│       └── fal_client.py    # fal.ai service integration
├── requirements.txt         # Dependencies
├── .env                     # Local secrets (gitignored)
└── uvicorn.log              # Local server logs
```

## Setup & Development

### Prerequisites

- Python 3.12 or higher installed
- `pip` and `venv` (standard with Python)

### Local Setup

#### Unix-based systems (macOS/Linux)

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Check Python version and create Virtual Environment**:
   
   First, verify you have Python 3.12+ installed:
   ```bash
   python3 --version
   ```
   
   If the version is 3.12 or higher, create the virtual environment:
   ```bash
   python3 -m venv venv
   ```
   
   > **Note**: If `python3 --version` shows an older version, you may need to use `python3.12` or `python3.13` explicitly, or install a newer Python version from [python.org](https://www.python.org/downloads/).

3. **Activate Virtual Environment**:
   ```bash
   source venv/bin/activate
   ```
   
   The previous step created a `venv/` folder containing an isolated Python environment with its own interpreter, pip, and packages. Activating it modifies your shell's PATH so that `python` and `pip` commands use this environment instead of your system Python. You'll see `(venv)` appear in your terminal prompt when active.

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Environment**:
   Create `.env` file in the `backend/` directory:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=your-secret-key
   SUPABASE_ANON_KEY=your-anon-key
   FAL_API_KEY=your-fal-api-key
   ```

6. **Run Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Windows (PowerShell)

1. **Navigate to backend directory**:
   ```powershell
   cd backend
   ```

2. **Check Python version and create Virtual Environment**:
   
   First, verify you have Python 3.12+ installed:
   ```powershell
   python --version
   ```
   
   If the version is 3.12 or higher, create the virtual environment:
   ```powershell
   python -m venv venv
   ```
   
   > **Note**: If your Python version is below 3.12, download and install a newer version from [python.org](https://www.python.org/downloads/). During installation, check "Add Python to PATH".

3. **Activate Virtual Environment**:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   
   The previous step created a `venv\` folder containing an isolated Python environment with its own interpreter, pip, and packages. Activating it modifies your shell's PATH so that `python` and `pip` commands use this environment instead of your system Python. You'll see `(venv)` appear in your terminal prompt when active.
   
   > **Note**: If you get an execution policy error, run this first:
   > ```powershell
   > Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   > ```

4. **Install Dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

5. **Configure Environment**:
   Create `.env` file in the `backend/` directory:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=your-secret-key
   SUPABASE_ANON_KEY=your-anon-key
   FAL_API_KEY=your-fal-api-key
   ```

6. **Run Server**:
   ```powershell
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Windows (Command Prompt)

1. **Navigate to backend directory**:
   ```cmd
   cd backend
   ```

2. **Check Python version and create Virtual Environment**:
   
   First, verify you have Python 3.12+ installed:
   ```cmd
   python --version
   ```
   
   If the version is 3.12 or higher, create the virtual environment:
   ```cmd
   python -m venv venv
   ```
   
   > **Note**: If your Python version is below 3.12, download and install a newer version from [python.org](https://www.python.org/downloads/). During installation, check "Add Python to PATH".

3. **Activate Virtual Environment**:
   ```cmd
   venv\Scripts\activate.bat
   ```
   
   The previous step created a `venv\` folder containing an isolated Python environment with its own interpreter, pip, and packages. Activating it modifies your shell's PATH so that `python` and `pip` commands use this environment instead of your system Python. You'll see `(venv)` appear in your terminal prompt when active.

4. **Install Dependencies**:
   ```cmd
   pip install -r requirements.txt
   ```

5. **Configure Environment**:
   Create `.env` file in the `backend/` directory:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SECRET_KEY=your-secret-key
   SUPABASE_ANON_KEY=your-anon-key
   FAL_API_KEY=your-fal-api-key
   ```

6. **Run Server**:
   ```cmd
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Deactivating the Virtual Environment

When you're done working, deactivate the virtual environment:

| Platform | Command |
| -------- | ------- |
| Unix (macOS/Linux) | `deactivate` |
| Windows (PowerShell/CMD) | `deactivate` |

## API Endpoints

### Avatar Generation

- **Endpoint**: `POST /api/avatar/generate`
- **Auth**: Bearer token (Supabase JWT) required in header
- **Body**: `{ "user_id": "uuid" }`
- **Description**:
  1. Fetches user's latest avatar photo from Supabase.
  2. Sends photo to fal.ai for model canvas generation.
  3. Downloads generated image.
  4. Uploads result to Supabase Storage.
  5. Updates database record status to `ready`.

## Security

- **CORS**: Configured for localhost origins (`http://localhost:5173`, `http://localhost:3000`). Must be updated with production domain(s) before deployment.
- **Supabase Admin**: The backend uses the Service Role key (or Anon key with high permissions) to bypass RLS for orchestration.
- **Secrets**: API keys (fal.ai) are stored server-side to prevent exposure in the browser.
- **Environment Variables**: See `ENV_SETUP.md` for complete guide on configuring secrets.
