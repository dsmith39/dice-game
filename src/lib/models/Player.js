import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
	nickname: {
		// Player;s Nickname
		type: String,
		required: [true, 'Please provide a nickname'],
		maxlength: [60, 'First name cannot be more than 60 characters']
	},

	score: {
		// The player's score
		type: Number
	}
});

export default mongoose.models.Request || mongoose.model('Player', PlayerSchema);
