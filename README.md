# Project Name
Tic-Tac-Toe

# Description
A tic-tac-toe game that uses prolog to compute the next move for the computer

# How to use
1. Download the files from [github](https://github.com/pekfoik/Prolog-React-Tic-Tac-Toe)
1. run the following commands (in order):
  * `npm install`
  * `npm run build`
  * `npm start`
1. Open [localhost:3000](http://localhost:3000) in your browser
1. Enjoy your game!

# List Of Predicts Used (In the alphabeta.pl file)
* main/0 - the predicate that runs it all, uses argv to get the pos and depth from the user. when compiling, this should be the goal to run
* alphabeta/6 - The same algorithm as in the book, Almost the same as the algorithm in the book, added depth variable in order to achieve changing difficulties.
* boundedbest/6 - The same algorithm as in the book, added depth in order to achieve changing difficulties.
* goodenough/7 - The same algorithm as in the book, checks if the pos is good enough for the given boundries
* newbounds/6 - The same algorithm as in the book, check if the given value is better than the current alpha/beta. if so, change the alpha/beta
* betterof/6 - The same algorithm as in the book, get the better position between the two
* moves/2 - Generates a list of the possible next moves from a given pos
* moves/3 - Changes a nil position in the pos to the current user's turn
* min_to_move/1 - True if it is the minimum player turn (according to the min-max algorithm)
* max_to_move/1 - True if it is the maximum player turn (according to the min-max algorithm)
* depth/1 - Get the depth given by the user (asserted in the main function)
* sum_list/2 - Sums a list of x/o/nil according to this math: x=1,o=-1,nil=0
* turn/2 - Get the current turn(x or o)
* h/2  
    Oh boy this is a big one, The heuristic function.  
    Calculate the score according to these rules:
    - Create the score for x and o separately, let's say we are calculating x score, then it will be done like this:
    - Count the number of x in every row, column and diagonal.
        1. if there is 1 x in the row/column/diagonal without any blocking o's, add 1 to the score
        1. if there are 2 x's in the row/column/diagonal without a blocking o, add 10 to the score
        1. if there are 3 x's in the row/column/diagonal, add 100 to the score (won)
    - After calculating the score for x and o separately, the final score is (o score)-(x score)
* calc_score/2 - Calculate the real score for h using the silly score
* convert_indexes/2 - Convert x to -2 (because x is the min player), o to 1 and any other value to 0. helper function for h
* neg/2 - Swaps every number to it's counterpart version
* neg_list/2 - activate the neg/2 predict on every item in the list in order to calculate the negative list in h
