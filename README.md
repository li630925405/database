#### We use a multi-pages react. To start the frontend:

```bash
Npx Create-next-app project
Cd project
Npm run dev
```

#### To start the backend:

```shell
# 1. create project
django-admin startproject mysite # or create from PyCharm directly
# 2. create app
python manage.py startapp backend
# create database
# First create a empty database locally, then the entries will be generated automatically.
python manage.py makemigrations
python manage.py migrate
# run server
python manage.py runserver 127.0.0.1:8000
```



