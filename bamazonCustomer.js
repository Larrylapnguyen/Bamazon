var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});

function start() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
		console.log("\n");
		console.table(res);
		console.log("\n");

		inquirer.prompt([{
				name: "product",
				message: "What is the ID of the product you would like to buy?\n",
				type: "input",
				validate: function (val) {
					if (isNaN(val) === false && parseInt(val) <= res.length && parseInt(val) > 0) {
						return true;
					} else {
						console.log("\nYou did not enter a number or the item does not exist!\n");
						return false;
					}
				}
			},
			{
				name: "quantity",
				message: "How much would you like to buy?\n",
				type: "input",
				validate: function (val) {
					if (isNaN(val) === true) {
						console.log("\nYou did not enter a number!\n");
						return false
					} else {
						return true
					}
				}
			}
		]).then(function (results) {
			var item = results.product;
			var quant = results.quantity;

			var query = "SELECT * FROM products where ?";
			connection.query(query, {
				item_id: item
			}, function (err, data) {
				if (err) throw err;
				if (data.length === 0) {
					console.log("The item you selected does not exist");
				}
				var itemData = data[0];
				if (quant <= itemData.stock_quantity) {
					console.log("The item is currently in stock, placing your order...");

					var bQuery = "UPDATE products SET stock_quantity = " + (itemData.stock_quantity - quant) + " WHERE item_id = " + item;
					var total = quant * itemData.price;
					connection.query(bQuery, function (err, res) {
						if (err) throw err;
						console.log(`Thank you for your purchase of ${quant}, ${itemData.product_name} for a total of $${total}.`);
						connection.end();
					});

				} else {
					console.log("Sorry, the item selected has insufficient quantity!");
					start()
				}
			});

		});
	})
}
start();