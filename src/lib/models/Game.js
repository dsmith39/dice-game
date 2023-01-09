import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
	id: {
		// Player;s Nickname
		type: String,
		required: [true, 'Please provide a nickname'],
		maxlength: [60, 'First name cannot be more than 60 characters']
	},
	playerNum: {
		// The number of players in the game
		type: Number
	},
	players: {
		// The players in the game
		type: Array
	}
});

export const GameModel = mongoose.models.Game ?? mongoose.model('Game', GameSchema);
