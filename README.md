# flask-websocket

- Dockerコンテナの起動
```
docker compose up -d
```

- Dockerコンテナへ入る
```
docker exec -it flask-websocket-flask-1 /bin/bash
```

- Flaskの起動
```
python main.py
```

- Dockerコンテナの削除
```
docker compose down --rmi all -v
```