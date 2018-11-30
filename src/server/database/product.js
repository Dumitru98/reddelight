var mongoose = require('mongoose');
var _ = require('lodash');

var productSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	categories: {
		type: [String],
		required: true
	}
}, {
	toObject: {
		transform: function(doc, ret) {
			delete ret.__v;
		}
	},
	toJSON: {
		transform: function(doc, ret) {
			delete ret.__v;
		}
	}
});

var Product = mongoose.model('Product', productSchema);

function createProduct(newProduct) {
	var product = new Product(_.assign({}, newProduct));

	return product.save();
}

function getById(id) {
	return Product.findOne({ id: id });
}

function addCategory(id, name) {
	return Product.updateOne({ id: id }, { $addToSet: { categories: name } });
}

function deleteCategory(id, name) {
	return Product.updateOne({ id: id }, { $pull: { categories: name } });
}

function deleteProduct(id) {
	return Product.deleteOne({ id: id });
}

var product = {
	createProduct,
	getById,
	addCategory,
	deleteCategory,
	deleteProduct
};

module.exports = product;