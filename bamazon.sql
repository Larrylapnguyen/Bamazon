DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id int auto_increment not null,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price dec(9,2) not null,
    stock_quantity int not null,
    primary key(item_id)
);

insert into products(product_name, department_name,price,stock_quantity)
value
("iPhone 10", "Electronics","999.99","80"),
("Samsung S10", "Electronics","999.99","90"),
("Tomatoes", "Groceries","00.30","100"),
("Ugly Christmas Sweater", "Apparel","15.99","20"),
("Tylenol", "Groceries","5.99","10"),
("Wireless Headphonese", "Electronics","79.99","32"),
("Monopoly", "Entertainment","60.00","23"),
("JavaScript For Idiots", "Books","13.99","11"),
("Coding Stickers", "Misc","11.99", "10"),
("Socks", "Apparel","8.99","13")