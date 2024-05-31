export const getPointsMatchDiscriminated = (match: IMatch, local_score: number, visitor_score: number, type: string) => {
  const matchIsATie = match.local_team.result === match.visiting_team.result;
  const userMatchIsATie = local_score === visitor_score;
  const localTeamIsWinner = match.local_team.result > match.visiting_team.result;
  const userSelectLocalAsWinner = local_score > visitor_score;
  const userSelectVisitorAsWinner = local_score < visitor_score;
  const matchPoints = matchIsATie && userMatchIsATie
    ? 3
    : localTeamIsWinner && userSelectLocalAsWinner
      ? 3
      : userSelectVisitorAsWinner
        ? 3 : 0;
  const localScorePoints = match.local_team.result === local_score ? 2 : 0;
  const visitorScorePoints = match.visiting_team.result === visitor_score ? 2 : 0;
  const exactScore = localScorePoints && visitorScorePoints ? 2 : 0;
  const addPoints = (matchIsATie && userMatchIsATie) && !exactScore ? 2 : 0;
  const disriminatedPointsStrategy: {[key: string]: number} = {
    matchPoints: matchPoints,
    localScorePoints: localScorePoints,
    visitorScorePoints: visitorScorePoints,
    exactScore: exactScore,
    addPoints: addPoints
  }
  return disriminatedPointsStrategy[type];
}
