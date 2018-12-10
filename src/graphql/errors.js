import { AuthenticationError, ForbiddenError, UserInputError, ApolloError } from 'apollo-server-express';

export const createAuthError = ({message}) => {
  return new AuthenticationError(message);
}

export const createForbiddenError = ({message}) => {
  return new ForbiddenError(message);
}

export const createUserInputError = ({message}) => {
  return new UserInputError(message);
}

export const createError = ({ message, code = '' }) => {
  return new ApolloError(message, code);
}
