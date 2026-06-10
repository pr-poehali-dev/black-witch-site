import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Получение и добавление отзывов ведьмы Мораны."""

    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    method = event.get("httpMethod", "GET")

    if method == "GET":
        cur.execute(
            "SELECT id, name, city, text, stars, created_at FROM reviews WHERE approved = TRUE ORDER BY created_at DESC LIMIT 50"
        )
        rows = cur.fetchall()
        result = [
            {
                "id": r[0],
                "name": r[1],
                "city": r[2] or "",
                "text": r[3],
                "stars": r[4],
                "created_at": r[5].isoformat() if r[5] else "",
            }
            for r in rows
        ]
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps(result, ensure_ascii=False)}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()[:100]
        city = (body.get("city") or "").strip()[:100]
        text = (body.get("text") or "").strip()
        stars = int(body.get("stars") or 5)

        if not name or not text:
            conn.close()
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Имя и текст обязательны"})}

        if stars < 1 or stars > 5:
            stars = 5

        cur.execute(
            "INSERT INTO reviews (name, city, text, stars) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, city, text, stars),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {"statusCode": 201, "headers": headers, "body": json.dumps({"id": new_id, "ok": True})}

    conn.close()
    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}
