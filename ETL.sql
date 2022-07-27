COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Users/feifeiliang/HR/SDC/products/data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/Users/feifeiliang/HR/SDC/products/data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/feifeiliang/HR/SDC/products/data/photos.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/feifeiliang/HR/SDC/products/data/features.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/feifeiliang/HR/SDC/products/data/related.csv'
DELIMITER ','
CSV HEADER;

COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/feifeiliang/HR/SDC/products/data/product.csv'
DELIMITER ','
CSV HEADER;