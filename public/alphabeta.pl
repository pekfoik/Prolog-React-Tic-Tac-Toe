/*
	Created at 20/10/2020 By Binyamin Houri
	File Name: alphabeta.pl
	Description: A program to compute the next move for a tic-tac-toe game using the alphabeta algorithm
	Input: 
		1. A list that represents the state of the game (nil=empty square, o=o square, x=x square)
		2. Difficulty (As an integer), varies between 1-9
	Output: A list representation for the suggested next move
	Synopsys: 
		call the compiled program with a list representing the state of the game and a difficulty.
		For example: $PATH_TO_FILE/$FILE_NAME [nil,nil,nil,nil,x,nil,nil,nil,nil] 9 will suggest the next move for this board:
		_____________
		|	|	|	|
		_____________
		|	| X |	|
		_____________
		|	|	|	|
		_____________
		with the hardest difficulty
*/

% main/0
% the predicate that runs it all, uses argv to get the pos and difficulty from the user.
% when compiling, this should be the goal to run (--goal=main)
main:-
	% get the argument variables
    current_prolog_flag(argv, Argv),Argv=[L|Other],atom_to_term(L,T,[]),
	Other=[L2|_],atom_to_term(L2,Depth,[]),
	% assert the depth for the goodenough predict
	asserta(depth(Depth)),
	% call alphabeta with -1000 1000 because better safe than sorry
    alphabeta(T, -1000, 1000, P, _,Depth),
	% returns the new position
    write(P).

% alphabeta/6
% The famous alpha-beta algorithm
% same as the algorithm in the book, but added depth variable in order to achieve changing difficulties.
alphabeta(Pos,Alpha,Beta,GoodPos,Val,Depth):-
	% Check that we don't overstep the depth
	Depth>0,
    moves(Pos,Poslist),!,
    boundedbest(Poslist,Alpha,Beta,GoodPos,Val,Depth);
    h(Pos,Val).

% boundedbest/6
% The same algorithm as in the book, added depth in order to achieve changing difficulties.
boundedbest([Pos|PosList],Alpha,Beta,GoodPos,GoodVal,Depth):-
	% Reduce the depth by one before calling alphabeta
	Depth1 is Depth-1,
    alphabeta(Pos,Alpha,Beta,_,Val,Depth1),
    goodenough(PosList,Alpha,Beta,Pos,Val,GoodPos,GoodVal).

% goodenough/7
% The same algorithm as in the book, checks if the pos is good enough for the given boundries
goodenough([],_,_,Pos,Val,Pos,Val):-!. % No other candidate
goodenough(_,Alpha,Beta,Pos,Val,Pos,Val):-
    min_to_move(Pos),Val>Beta,!; % Maximizer attained upper bound
    max_to_move(Pos),Val<Alpha,!. % Minimizer attained lower bound
goodenough(PosList,Alpha,Beta,Pos,Val,GoodPos,GoodVal):-
    newbounds(Alpha,Beta,Pos,Val,NewAlpha,NewBeta), % Refine bounds
	depth(X),
    boundedbest(PosList,NewAlpha,NewBeta,Pos1,Val1,X),
    betterof(Pos,Val,Pos1,Val1,GoodPos,GoodVal).

% newbounds/6 
% The same algorithm as in the book, check if the given value is better than the current alpha/beta. if so, change the alpha/beta
newbounds(Alpha,Beta,Pos,Val,Val,Beta):-
    min_to_move(Pos),Val>Alpha,!. % Maximizer increased lower bound
newbounds(Alpha,Beta,Pos,Val,Alpha,Val):-
    max_to_move(Pos),Val<Beta,!. % Minimizer decreased upper bound
newbounds(Alpha,Beta,_,_,Alpha,Beta).

% betterof/6 
% The same algorithm as in the book, get the better position between the given two
betterof(Pos,Val,_,Val1,Pos,Val):-
    min_to_move(Pos),Val>Val1,!;
    max_to_move(Pos),Val<Val1,!.
betterof(_,_,Pos1,Val1,Pos1,Val1).

% moves/2
% generates a list of possible moves
moves(Pos, PosList):-
    turn(Pos, Turn),
    h(Pos, X),
	% If X < -50 OR 50 < X then Pos is a won position (numbers this high can't be achieved from the heuristic function without winning)
    X > -50,
    X < 50, 
	findall(List, move(Pos, List, Turn), PosList),
	% Return false if the list is empty
    PosList \== [].
	
% move/3
% Changes a nil position in the pos to the current user's turn
move([],_,_):- false.
move([X|Rest], [X|NewRest], Turn):-
	move(Rest, NewRest, Turn).
move([nil|Rest], [Turn|Rest], Turn).

% min_to_move/1
% Determine if the min player should move now
min_to_move(L):-
    sum_list(L, X),
    X>=0.

% max_to_move/1
% Determine if the max player should move now
max_to_move(L):-
    sum_list(L, X),
    0>X.

% sum_list/2
% Sums a pos list by this rules - x=1,o=-1,other=0
sum_list([],0).
sum_list([x|R], X):-
    !,
    sum_list(R, X1),
    X is X1-1.
sum_list([o|R], X):-
    !,
    sum_list(R, X1),
    X is X1+1.
sum_list([nil|R], X):-
    sum_list(R, X).

% turn/2
% Gets the current turn(x or o)
turn(Pos, x):-
    min_to_move(Pos).
turn(Pos, o):-
    max_to_move(Pos).

% h/2
% Oh boy this is a big one. The heuristic function. calculate the score according to these rules:
% Create the score for x and o separately, let's say we are calculating x score, then it will be done like this:
% Count the number of x in every row, column and diagonal.
% if there is 1 x in the row/column/diagonal without any blocking o's, add 1 to the score
% if there are 2 x's in the row/column/diagonal without a blocking o, add 10 to the score
% if there are 3 x's in the row/column/diagonal, add 100 to the score (won)
% after calculating the score for x and o separately, the final score is (o score)-(x score)
h(L, X):-
	% Convert the indexes to numbers in order to calculate them more easily
	convert_indexes(L, [Index11,Index12,Index13,Index21,Index22,Index23,Index31,Index32,Index33]),
	% Get the given list but multiply each index by -1
	neg_list([Index11,Index12,Index13,Index21,Index22,Index23,Index31,Index32,Index33],[NIndex11,NIndex12,NIndex13,NIndex21,NIndex22,NIndex23,NIndex31,NIndex32,NIndex33]),
	% Get the "silly" score for every RCD(Row/Column/Diagonal)
	Row1 is Index11+Index12+Index13,
	Row2 is Index21+Index22+Index23,
	Row3 is Index31+Index32+Index33,
	Col1 is Index11+Index21+Index31,
	Col2 is Index12+Index22+Index32,
	Col3 is Index13+Index23+Index33,
	Diag1 is Index11+Index22+Index33,
	Diag2 is Index13+Index22+Index31,
	% Calculate the real score based on the "silly" score
	calc_score(Row1, SR1),
	calc_score(Row2, SR2),
	calc_score(Row3, SR3),
	calc_score(Col1, SC1),
	calc_score(Col2, SC2),
	calc_score(Col3, SC3),
	calc_score(Diag1, SD1),
	calc_score(Diag2, SD2),
	% Do the same for the negative values
	NRow1 is NIndex11+NIndex12+NIndex13,
	NRow2 is NIndex21+NIndex22+NIndex23,
	NRow3 is NIndex31+NIndex32+NIndex33,
	NCol1 is NIndex11+NIndex21+NIndex31,
	NCol2 is NIndex12+NIndex22+NIndex32,
	NCol3 is NIndex13+NIndex23+NIndex33,
	NDiag1 is NIndex11+NIndex22+NIndex33,
	NDiag2 is NIndex13+NIndex22+NIndex31,
	calc_score(NRow1, NSR1),
	calc_score(NRow2, NSR2),
	calc_score(NRow3, NSR3),
	calc_score(NCol1, NSC1),
	calc_score(NCol2, NSC2),
	calc_score(NCol3, NSC3),
	calc_score(NDiag1, NSD1),
	calc_score(NDiag2, NSD2),
	% Pos(Positive) the final score for the o's. Neg(Negative) the final score for the x's
	Pos is SR1+SR2+SR3+SC1+SC2+SC3+SD1+SD2,
	Neg is NSR1+NSR2+NSR3+NSC1+NSC2+NSC3+NSD1+NSD2,
    !, % Don't re-calculate stuff
	X is Pos-Neg.

% calc_score/2
% calculate the real score for h using the silly score
% 1 = one in a row, 2 = two in a row, 3 = three in a row, any other number is a row full of nil or blocked by o
calc_score(X,0):-
	0>=X.
calc_score(1,1).
calc_score(2,10).
calc_score(3,100).

% convert_indexes/2
% convert x to -2 (because x is the min player), o to 1 and any other value to 0
% helper function for h
convert_indexes([], _).
convert_indexes([o|Rest], [1|OtherRest]):-
		convert_indexes(Rest, OtherRest).
convert_indexes([x|Rest], [-2|OtherRest]):-
		convert_indexes(Rest, OtherRest).
convert_indexes([_|Rest], [0|OtherRest]):-
		convert_indexes(Rest, OtherRest).

% neg/2
% swaps every number to it's counterpart version
neg(1,-2).
neg(0,0).
neg(-2,1).

% neg_list/2 
% activate the neg/2 predict on every item in the list in order to calculate the negative list in h
neg_list([],_).
neg_list([X|Rest],[NX|NRest]):-
	neg_list(Rest,NRest),
	neg(X,NX).