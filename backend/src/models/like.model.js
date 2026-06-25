const mongoose = require('mongoose');



const like = new mongoose.Schema({


     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
     },


     food:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'food',
        required:true
     }
},{

    timestamps:true
})


const Like = mongoose.model('like',like);

module.exports = Like;