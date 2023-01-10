import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
	id: {
		// Player;s Nickname
		type: String,
		required: [true, 'Please provide a nickname']
	},
	playerNum: {
		// The number of players in the game
		type: Number
	},
	players: {
		// The players in the game
		type: Array
	},
	currentTurn: {
		// The current turn
		type: Number
	}
});

export const GameModel = mongoose.models.Game ?? mongoose.model('Game', GameSchema);
