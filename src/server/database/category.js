var mongoose = require('mongoose');
var _ = require('lodash');

var categorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	products: {
		type: []
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

function createCategory(newCategory) {
	var category = new Category(_.assign({}, newCategory));

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

function deleteProduct(name, id) {
	return Category.updateOne({ name: name }, { $pull: { id: id } });
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
	deleteProduct,
	deleteCategory
};

module.exports = category;