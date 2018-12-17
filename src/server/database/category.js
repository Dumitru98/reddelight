var mongoose = require('mongoose');
var _ = require('lodash');

var categorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	products: {
		type: [],
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

var Category = mongoose.model('Category', categorySchema);

function createCategory(name) {
	var category = new Category(_.assign({}, {
		name: name,
		products: []
	}));

	return category.save();
}

function listCategories() {
	return Category.find();
}

function findByCategoryName(name) {
	return Category.findOne({ name: name });
}

function addProduct(name, product) {
	return Category.updateOne({ name: name }, { $addToSet: { products: product } });
}

function getProductsFromCategory(name) {
	return Category.findOne({ name: name });
}

function getAllCategories() {
	return Category.find();
}

function deleteProduct(name, id) {
	return Category.updateOne({ name: name }, { $pull: { products: { id: id } } });
}

function deleteCategory(name) {
	return Category.deleteOne({ name: name });
}

var category = {
	createCategory,
	listCategories,
	findByCategoryName,
	addProduct,
	getProductsFromCategory,
	getAllCategories,
	deleteProduct,
	deleteCategory
};

module.exports = category;