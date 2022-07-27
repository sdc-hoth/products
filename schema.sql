CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(255),
  default_price VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS related (
  id INT PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);

CREATE TABLE IF NOT EXISTS features (
  id INT PRIMARY KEY,
  product_id INT,
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY,
  styleId INT,
  url VARCHAR(255),
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS skus (
  id INT PRIMARY KEY,
  styleId INT,
  size VARCHAR(255),
  quantity VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS styles (
  id INT PRIMARY KEY,
  productId INT,
  name VARCHAR(255),
  sale_price VARCHAR(255),
  original_price VARCHAR(255),
  default_style BOOLEAN
)


