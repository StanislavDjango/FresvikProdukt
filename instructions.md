# Инструкция: как выложить новый сайт на сервер и сделать его общедоступным

Ниже пошаговый порядок, чтобы любой новый сайт (например Fresvik) стал доступен в интернете через Cloudflare Tunnel и не ломал уже работающие проекты.

---

## 0) Предусловия
- Домен куплен и **добавлен в Cloudflare** (nameservers у домена — Cloudflare).
- На сервере установлен `docker` и `docker compose`.
- `cloudflared` уже установлен и работает (есть активный туннель).
- Есть SSH‑доступ к серверу.

---

## 1) Собираем и пушим Docker‑образ
Пример для фронтенда:
```bash
docker build -t <dockerhub_user>/<site>-frontend:latest ./frontend
docker push <dockerhub_user>/<site>-frontend:latest
```

Если есть backend — собрать и запушить его так же:
```bash
docker build -t <dockerhub_user>/<site>-backend:latest ./backend
docker push <dockerhub_user>/<site>-backend:latest
```

---

## 2) Поднимаем контейнер на сервере (локально, без внешних портов)
1) Создать папку под сайт:
```bash
sudo mkdir -p /srv/<site>
sudo chown <user>:<user> /srv/<site>
```

2) Создать `/srv/<site>/docker-compose.yml`.
Пример для **только фронтенда**:
```yaml
services:
  <site>-frontend:
    image: <dockerhub_user>/<site>-frontend:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:5174:5173"
```

Важно:
- Всегда пробрасывать **только на localhost** (`127.0.0.1`), чтобы порт не был виден из интернета напрямую.
- Для каждого нового сайта — свой локальный порт (например `5174`, `5175`, `8081`).

3) Запустить:
```bash
cd /srv/<site>
docker compose pull
docker compose up -d
```

---

## 3) Настраиваем Cloudflare Tunnel
Если туннель **локально‑управляемый** (как `norskkurs`), правим файл:
`/etc/cloudflared/config.yml`

Пример блока:
```yaml
ingress:
  - hostname: norskkurs.xyz
    path: /api/*
    service: http://localhost:8000
  - hostname: norskkurs.xyz
    path: /admin/*
    service: http://localhost:8000
  - hostname: norskkurs.xyz
    service: http://localhost:5173

  - hostname: stanislav.help
    service: http://localhost:5174
  - hostname: www.stanislav.help
    service: http://localhost:5174

  - service: http_status:404
```

После правки:
```bash
sudo systemctl restart cloudflared
sudo systemctl status cloudflared --no-pager
```

Если в UI есть вкладка **Public Hostnames** — можно добавлять хосты там.
⚠️ Но если Cloudflare предлагает **Migration**, лучше не включать миграцию (необратимо).

---

## 4) DNS‑записи домена (публичный доступ)
В DNS домена (в Cloudflare):
```
Type: CNAME
Name: @
Target: <tunnel-id>.cfargotunnel.com
Proxy: ON (оранжевая тучка)

Type: CNAME
Name: www
Target: <tunnel-id>.cfargotunnel.com
Proxy: ON
```

Если Public Hostnames добавлены через Tunnel UI — DNS создастся автоматически.

---

## 5) Проверка
На сервере:
```bash
curl -I http://localhost:5174
curl -I -H "Host: stanislav.help" http://localhost:5174
```

Снаружи:
```bash
nslookup stanislav.help 1.1.1.1
```
Должен показывать адреса Cloudflare.
Затем открыть `https://stanislav.help`.

---

## 6) Частые проблемы
### 403 Forbidden
Часто причина — Vite dev‑сервер блокирует неизвестные домены.  
Решение: добавить в `vite.config.js`:
```js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['stanislav.help', 'www.stanislav.help', 'localhost', '127.0.0.1'],
  },
})
```
Пересобрать и запушить образ.

### 404 / 530
Туннель не видит сервис:
- Проверить `/etc/cloudflared/config.yml`
- Проверить `cloudflared`:
```bash
sudo systemctl status cloudflared --no-pager
sudo journalctl -u cloudflared --no-pager -n 50
```

---

## 7) Обновление сайта
1) Собрать и запушить новый образ:
```bash
docker build -t <dockerhub_user>/<site>-frontend:latest ./frontend
docker push <dockerhub_user>/<site>-frontend:latest
```
2) На сервере:
```bash
cd /srv/<site>
docker compose pull
docker compose up -d
```

---

## 8) Безопасность
- **Не вставлять ключи Cloudflare в чат.** Только локально.
- Порты всегда привязывать к `127.0.0.1`.
- Домен и туннель можно использовать один для нескольких сайтов — это нормально.
- Для полной изоляции можно создать отдельный туннель, но это не обязательно.

---

## Короткий чеклист (самое важное)
1) Образ → Docker Hub  
2) Контейнер на сервере → только localhost  
3) В туннеле ingress → домен → локальный порт  
4) DNS CNAME → tunnel‑id  
5) Проверка через `https://домен`
