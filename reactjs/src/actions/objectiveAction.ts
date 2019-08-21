import {
  FETCH_OBJECTIVES_REQUEST,
  FETCH_OBJECTIVES_SUCCESS,
  FETCH_OBJECTIVES_ERROR,
  FETCH_OBJECTIVE_REQUEST,
  FETCH_OBJECTIVE_SUCCESS,
  FETCH_OBJECTIVE_ERROR
} from '../constants/actionTypes';

import {
  fetchRequest,
  fetchSuccess,
  fetchError,
  fetchTarget,
  fetchItems
} from './actionUtil';

export const fetchObjectivesRequest = fetchRequest(FETCH_OBJECTIVES_REQUEST);
export const fetchObjectivesSuccess = fetchSuccess(FETCH_OBJECTIVES_SUCCESS);
export const fetchObjectivesError = fetchError(FETCH_OBJECTIVES_ERROR);
export const fetchObjectiveRequest = fetchRequest(FETCH_OBJECTIVE_REQUEST);
export const fetchObjectiveSuccess = fetchSuccess(FETCH_OBJECTIVE_SUCCESS);
export const fetchObjectiveError = fetchError(FETCH_OBJECTIVE_ERROR);

export const fetchObjectives = (resourceId: string) => {
  return fetchItems(
    resourceId,
    fetchObjectivesRequest,
    fetchObjectivesSuccess,
    fetchObjectivesError
  );
};

export const fetchObjective = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchObjectiveRequest,
    fetchObjectiveSuccess,
    fetchObjectiveError
  );
};
