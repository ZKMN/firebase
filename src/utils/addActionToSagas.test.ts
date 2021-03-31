import {
  XHRMethod,
  createActionType,

  getActions,
  postActions,
  patchActions,
  putActions,
  deleteActions,
  addActionToSagas,
} from 'utils';

describe('addActionToSagas', () => {
  it('adds GET actions to getActions array', () => {
    const TEST_GET = createActionType('TEST', XHRMethod.Get);
    addActionToSagas(TEST_GET);

    const getAction = getActions.find(action => action === TEST_GET.REQUEST);
    expect(getAction).toBe(TEST_GET.REQUEST);
  });

  it('adds POST actions to postActions array', () => {
    const TEST_POST = createActionType('TEST', XHRMethod.Post);
    addActionToSagas(TEST_POST);

    const saveAction = postActions.find(action => action === TEST_POST.REQUEST);
    expect(saveAction).toBe(TEST_POST.REQUEST);
  });

  it('adds PUT actions to putActions array', () => {
    const TEST_PUT = createActionType('TEST', XHRMethod.Put);
    addActionToSagas(TEST_PUT);

    const updateAction = putActions.find(action => action === TEST_PUT.REQUEST);
    expect(updateAction).toBe(TEST_PUT.REQUEST);
  });

  it('adds PATCH actions to patchActions array', () => {
    const TEST_PATCH = createActionType('TEST', XHRMethod.Patch);
    addActionToSagas(TEST_PATCH);

    const patchAction = patchActions.find(action => action === TEST_PATCH.REQUEST);
    expect(patchAction).toBe(TEST_PATCH.REQUEST);
  });

  it('adds DELETE actions to deleteActions array', () => {
    const TEST_DELETE = createActionType('TEST', XHRMethod.Delete);
    addActionToSagas(TEST_DELETE);

    const deleteAction = deleteActions.find(action => action === TEST_DELETE.REQUEST);
    expect(deleteAction).toBe(TEST_DELETE.REQUEST);
  });
});
