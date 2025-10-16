# My Portfolio

This repository contains my personal portfolio website built with HTML, CSS, JavaScript and a Django (Python) backend used for the chat/contact functionality. The site is fully usable as a static site — if you only want the static pages, you can safely ignore or remove the Django/chat folder after cloning.

What I did: I created a clear README that explains both ways to use this project (static-only or full Django app), step-by-step setup commands, and a short note about ignoring the Django chat folder when you only need static files. Read on for quick start and detailed instructions.

Table of contents
- Project overview
- Tech stack
- Quick preview
- Quick static-only setup
- Full Django setup
- How to ignore/remove the Django chat folder
- Adding/updating projects and assets
- Build & deploy (static + Django notes)
- Contributing
- License & credits
- Troubleshooting & FAQ

---

Project overview
This repo hosts a portfolio site with:
- Static front-end built in HTML, CSS and JavaScript.
- Optional Django backend (Python) used for chat/contact features and any dynamic behavior.
- Static files (images, styles, scripts) are included and the front-end works without running Django.

Tech stack
- HTML, CSS — layout and styling
- JavaScript — client-side interactivity
- Python, Django — optional backend for chat/contact or dynamic pages

Quick preview
- Static preview: open index.html in a browser or serve the folder with a static server (see below).
- Full app: run the Django server to test the chat/contact features.

Quick static-only setup (recommended if you just want the front-end)
1. Clone the repo:
```bash
git clone https://github.com/kedza-bot/myportfolio.git
cd myportfolio
```

2. If you want to remove the Django chat/backend folder after cloning (optional):
```bash
# Remove the folder named `django_chat` (replace the folder name if it's different)
rm -rf django_chat
```

3. Serve the site locally (option A or B):
Option A — Open directly:
- Double-click `index.html` or open it in your editor/browser.

Option B — Serve with Python (recommended so paths and fetch calls work correctly):
```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000
```

If you prefer to only clone the files you need, see the "Ignore/remove the Django chat folder" section below for a sparse-checkout example.

Full Django setup (if you want the backend features)
1. Clone the repo:
```bash
git clone https://github.com/kedza-bot/myportfolio.git
cd myportfolio
```

2. Create and activate a virtual environment:
macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
```
Windows (PowerShell):
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

3. Install dependencies:
```bash
# If a requirements.txt exists
pip install -r requirements.txt
# or
pip install django gunicorn django-environ  # example packages
```

4. Configure environment variables
- Create a `.env` file or export environment variables for:
  - SECRET_KEY
  - DEBUG (True/False)
  - ALLOWED_HOSTS
  - EMAIL settings (if contact uses email)
  - Any other provider keys you use (SendGrid, Mailgun, etc.)

5. Apply migrations:
```bash
python manage.py migrate
```

6. Collect static files (for production and some local setups):
```bash
python manage.py collectstatic
```

7. Create a superuser (optional, for admin):
```bash
python manage.py createsuperuser
```

8. Run the development server:
```bash
python manage.py runserver
# open http://127.0.0.1:8000
```

Ignore/remove the Django chat folder (options)
- Simple (after cloning): remove the folder
```bash
rm -rf django_chat
```

- Sparse checkout (avoid downloading the folder at all) — advanced, optional:
```bash
git clone --no-checkout https://github.com/kedza-bot/myportfolio.git
cd myportfolio
git sparse-checkout init --cone
# include top-level files or paths you want, excluding the django_chat folder
git sparse-checkout set .
git checkout
```
Note: sparse-checkout examples depend on your Git version and repo layout. The simplest approach is cloning normally and removing the folder.

How to add / update projects (static front-end)
- If projects are hard-coded in HTML:
  1. Edit the projects section in index.html or the appropriate HTML file.
  2. Add image assets to `assets/images/` (or `images/`) and update paths.
  3. Test locally.

- If your projects are stored in a JSON/data file (recommended):
  1. Add the project entry to `data/projects.json` (or similar).
  2. Update any front-end JS that reads that file.
  3. Test.

Assets best practices
- Optimize images (use WebP or compressed JPEG/PNG).
- Keep images under an `assets/` or `static/` folder and reference with relative paths.
- Add meaningful alt text for accessibility.

Build & deploy
Static deployment (no backend)
- GitHub Pages:
  1. Push to repo.
  2. In repository Settings → Pages, select branch `main` and folder `/` or `/docs`.
  3. Site will be available at https://kedza-bot.github.io/myportfolio

- Netlify / Vercel:
  1. Connect your GitHub repo.
  2. Set build command (if any) and publish directory (e.g., `/` or `/dist`).
  3. Deploy.

Django deployment (if you use the backend)
- Platforms: Heroku, Render, Railway, DigitalOcean App Platform, or VPS + Gunicorn + Nginx.
- Make sure to:
  - Set environment variables securely.
  - Use a real database (Postgres recommended).
  - Configure static files (Whitenoise or cloud storage like AWS S3).
  - Set DEBUG=False and configure ALLOWED_HOSTS.

Contributing
- Open an issue for bugs or feature requests.
- Create a branch for changes:
```bash
git checkout -b feat/describe-your-change
```
- Commit, push, and open a pull request with a description.

License & credits
- Add a LICENSE file (MIT, Apache-2.0, or your choice).
- Credit templates, icons, libraries, and any third-party assets in the README.

Troubleshooting & FAQ
Q: I only want the static site — do I need Django?
A: No. You can use the static HTML/CSS/JS files. Simply ignore or delete the `django_chat` folder after cloning.

Q: Contact form doesn't send messages locally.
A: Check your backend settings, email provider credentials, and that environment variables are set. With DEBUG=True, look at Django logs for errors.

Q: CSS/JS changes aren’t reflected.
A: Clear browser cache, hard reload (Ctrl/Cmd+Shift+R), or ensure you rebuilt/collected static files if using Django collectstatic.

