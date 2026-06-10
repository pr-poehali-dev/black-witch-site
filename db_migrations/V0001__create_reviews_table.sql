CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  text TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  approved BOOLEAN DEFAULT TRUE
);

INSERT INTO reviews (name, city, text, stars) VALUES
  ('Анастасия К.', 'Москва', 'После ритуала на привлечение удачи в бизнесе мои доходы выросли вдвое за три месяца. Морана — настоящий мастер.', 5),
  ('Виктор Л.', 'Санкт-Петербург', 'Обратился по поводу снятия порчи. Уже на следующий день почувствовал облегчение. Результат держится уже год.', 5),
  ('Елена С.', 'Казань', 'Гадание на хрустальном шаре поразило точностью. Всё, что было сказано — сбылось до мелочей.', 5);
