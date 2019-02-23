/**
 * Import
 */

const mongoose   = require('mongoose');
const { Schema } = mongoose;

/**
 * Configuration
 */

const messageSchema = new Schema({
  from  : String,
  to    : String,
  value : String,
  date  : Date
});

/**
* Export
*/

const messageModel = mongoose.model('message', messageSchema);
module.exports = messageModel;
