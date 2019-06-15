// eslint-disable
// this is an auto generated file. This will be overwritten

export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    name
    inning
    player
    profile_number
    comment
    point
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      inning
      player
      profile_number
      comment
      point
    }
    nextToken
  }
}
`;
