%The alpha-beta algorithm
alphabeta(Pos,Alpha,Beta,GoodPos,Val,Depth):-
	Depth>0,
    moves(Pos,Poslist),!,
    boundedbest(Poslist,Alpha,Beta,GoodPos,Val,Depth);
    h(Pos,Val).

boundedbest([Pos|PosList],Alpha,Beta,GoodPos,GoodVal,Depth):-
	Depth1 is Depth-1,
    alphabeta(Pos,Alpha,Beta,_,Val,Depth1),
    goodenough(PosList,Alpha,Beta,Pos,Val,GoodPos,GoodVal).

goodenough([],_,_,Pos,Val,Pos,Val):-!. %No other candidate
goodenough(_,Alpha,Beta,Pos,Val,Pos,Val):-
    min_to_move(Pos),Val>Beta,!; %Maximizer attained upper bound
    max_to_move(Pos),Val<Alpha,!. %Minimizer attained lower bound
goodenough(PosList,Alpha,Beta,Pos,Val,GoodPos,GoodVal):-
    newbounds(Alpha,Beta,Pos,Val,NewAlpha,NewBeta), %Refine bounds
	depth(X),
    boundedbest(PosList,NewAlpha,NewBeta,Pos1,Val1,X),
    betterof(Pos,Val,Pos1,Val1,GoodPos,GoodVal).

newbounds(Alpha,Beta,Pos,Val,Val,Beta):-
    min_to_move(Pos),Val>Alpha,!.%Maximizer increased lower bound
newbounds(Alpha,Beta,Pos,Val,Alpha,Val):-
    max_to_move(Pos),Val<Beta,!.%Minimizer decreased upper bound
newbounds(Alpha,Beta,_,_,Alpha,Beta).

betterof(Pos,Val,_,Val1,Pos,Val):-
    min_to_move(Pos),Val>Val1,!;
    max_to_move(Pos),Val<Val1,!.
betterof(_,_,Pos1,Val1,Pos1,Val1).

%min_to_move/1
% Determine if the min player should move now
min_to_move(L):-
    sum_list(L, X),
    X>=0.

max_to_move(L):-
    sum_list(L, X),
    0>X.

%sum_list/2
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

moves(Pos, PosList):-
    turn(Pos, Turn),
    h(Pos, X),
    X > -50,
    X < 50, %If -50 < X < 50 then Pos is not a won position
	findall(List, move(Pos, List, Turn), PosList),
    PosList \== [].
	
%get_first_member/2
%Gets the first open member in the list(without x or o)
move([],_,_):- false.
move([X|Rest], [X|NewRest], Turn):-
	move(Rest, NewRest, Turn).
move([nil|Rest], [Turn|Rest], Turn).

turn(Pos, x):-
    min_to_move(Pos).
turn(Pos, o):-
    max_to_move(Pos).

h(L, X):-
	convert_indexes(L, [Index11,Index12,Index13,Index21,Index22,Index23,Index31,Index32,Index33]),
	neg_list([Index11,Index12,Index13,Index21,Index22,Index23,Index31,Index32,Index33],[NIndex11,NIndex12,NIndex13,NIndex21,NIndex22,NIndex23,NIndex31,NIndex32,NIndex33]),
	% If any of the indexes is 0 (Which happens when the index is filled with a circle) 
	% then the whole Multiplaction value will be 0
	% Because it means that we can't win using that row/Col/Diag
	Row1 is Index11+Index12+Index13,
	Row2 is Index21+Index22+Index23,
	Row3 is Index31+Index32+Index33,
	Col1 is Index11+Index21+Index31,
	Col2 is Index12+Index22+Index32,
	Col3 is Index13+Index23+Index33,
	Diag1 is Index11+Index22+Index33,
	Diag2 is Index13+Index22+Index31,
	calc_score(Row1, SR1),
	calc_score(Row2, SR2),
	calc_score(Row3, SR3),
	calc_score(Col1, SC1),
	calc_score(Col2, SC2),
	calc_score(Col3, SC3),
	calc_score(Diag1, SD1),
	calc_score(Diag2, SD2),
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
	Pos is SR1+SR2+SR3+SC1+SC2+SC3+SD1+SD2,
	Neg is NSR1+NSR2+NSR3+NSC1+NSC2+NSC3+NSD1+NSD2,
    !,
	X is Pos-Neg.

calc_score(X,0):-
	0>=X.
calc_score(1,1).
calc_score(2,10).
calc_score(3,100).

neg(1,-2).
neg(0,0).
neg(-2,1).

neg_list([],_).
neg_list([X|Rest],[NX|NRest]):-
	neg_list(Rest,NRest),
	neg(X,NX).

convert_indexes([], _).
convert_indexes([o|Rest], [1|OtherRest]):-
		convert_indexes(Rest, OtherRest).
convert_indexes([x|Rest], [-2|OtherRest]):-
		convert_indexes(Rest, OtherRest).
convert_indexes([_|Rest], [0|OtherRest]):-
		convert_indexes(Rest, OtherRest).

main:-
    current_prolog_flag(argv, Argv),Argv=[L|Other],atom_to_term(L,T,[]),
	Other=[L2|_],atom_to_term(L2,Depth,[]),
	asserta(depth(Depth)),
    alphabeta(T, -1000, 1000, P, _,Depth),
    write(P).