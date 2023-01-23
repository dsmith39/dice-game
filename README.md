# Dice Game

A dice game inspired by _Jasmine Dease_

## Objective

The objective of the game is to reach a total score of 10,000

## Rules

- The First player rolls 5 dice
  - If the dice roll is a jackpot (1,2,3,4,5 or 2,3,4,5,6) then the player scores 750 and can choose to roll again or end their turn
  - If the dice roll contains a triplet (1,1,1 for example), then the player scores 1000 if they are ones and 200 for twos, 300 for threes, etc and the triplet is taken out of the player's roll. Then the player can choose to roll again or end their turn
  - If there are any ones or fives, then the player can choose those dice and add it to their score, 100 each 1 and 50 for each 5. Then the player can choose to end their turn or roll again.
  - If The player's roll does not contain a triplet, jackpot or any 1's or 5's, then the player gets a crapout and scores 0. They can only end their turn at this point

### notes

- The Game is saved after everytime the end turn button is pressed.
