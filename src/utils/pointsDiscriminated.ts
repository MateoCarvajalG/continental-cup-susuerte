interface IMatch {
  local_team: {
    result: number
  },
  visiting_team: {
    result: number
  }
}
export interface discriminatedPoints {
  matchPoints: number,
  localScorePoints: number,
  visitorScorePoints: number,
  exactScore: number,
  addPoints: number
}

export const getPointsMatchDiscriminated = (match: IMatch, local_score: number, visitor_score: number): discriminatedPoints => {
  if(local_score === null || visitor_score === null) {
    return {
      matchPoints: 0,
      localScorePoints: 0,
      visitorScorePoints: 0,
      exactScore: 0,
      addPoints: 0
    }
  }
  const matchIsATie = match.local_team.result === match.visiting_team.result;
  const userMatchIsATie = local_score === visitor_score;
  const localTeamIsWinner = match.local_team.result > match.visiting_team.result;
  const userSelectLocalAsWinner = local_score > visitor_score;
  const userSelectVisitorAsWinner = local_score < visitor_score;
  const matchPoints = (): number => {
    if(matchIsATie && userMatchIsATie) {
      return 3;
    }
    if(matchIsATie) {
      return 0;
    }
    if(localTeamIsWinner && userSelectLocalAsWinner) {
      return 3;
    }
    if(!localTeamIsWinner && userSelectVisitorAsWinner) {
      return 3;
    }
    return 0;
  }

  const localScorePoints = match.local_team.result === local_score ? 2 : 0;
  const visitorScorePoints = match.visiting_team.result === visitor_score ? 2 : 0;
  const exactScore = localScorePoints && visitorScorePoints ? 5 : 0;
  const addPoints = (matchIsATie && userMatchIsATie) && !exactScore ? 2 : 0;
  const disriminatedPoints: discriminatedPoints = {
    matchPoints: matchPoints(),
    localScorePoints: localScorePoints,
    visitorScorePoints: visitorScorePoints,
    exactScore: exactScore,
    addPoints: addPoints
  }
  return disriminatedPoints;
}