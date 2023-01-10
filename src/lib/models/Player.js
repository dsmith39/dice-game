import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
	id: {
		// Player's ID
		type: String,
		required: [true, 'Please provide an ID']
	},
	nickname: {
		// Player's Nickname
		type: String,
		required: [true, 'Please provide a nickname'],
		maxlength: [60, 'First name cannot be more than 60 characters']
	},

	score: {
		// The player's score
		type: Number
	},
	createdDate: {
		// The date the player was created
		type: Date,
		default: Date.now
	},
	totalScore: {
		// The player's total score
		type: Number
	},
	isPlaying: {
		// If the player is playing
		type: Boolean,
		default: false
	}
});

export const PlayerModel = mongoose.models.Request ?? mongoose.model('Player', PlayerSchema);
