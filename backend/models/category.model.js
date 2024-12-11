import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    }
});

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

// const categories = [
//     {
//         name: 'Electronics',
//         icon: '📱',
//         color: '#FF5733'
//     },
//     {
//         name: 'Books',
//         icon: '📚',
//         color: '#33FF57'
//     },
//     {
//         name: 'Fashion',
//         icon: '👗',
//         color: '#3357FF'
//     },
//     {
//         name: 'Groceries',
//         icon: '🛒',
//         color: '#FFD700'
//     },
//     {
//         name: 'Sports',
//         icon: '⚽',
//         color: '#FF1493'
//     }
// ];

// Category.insertMany(categories)
//     .then(() => {
//         console.log('Categories inserted successfully!');
//     })
//     .catch((error) => {
//         console.error('Error inserting categories:', error);
//     });
