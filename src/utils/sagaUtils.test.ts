import {
  XHRMethod,
  createActionType,
  createRequestAction,
  
  addParamsToURL,
} from 'utils';

const REQUEST_POST = createActionType('REQUEST', XHRMethod.Post);

describe('addParamsToURL', () => {
  it('does not add additional props as params from action creator to the url', () => {

    const url = '/v1/delivery';
    const returnedUrl = '/v1/delivery';

    const postRequest = createRequestAction(REQUEST_POST, url);
    const filter = postRequest({
      payload: {
        a: 1,
        b: 2,
      },
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('replaces params in the url by new values from filter object', () => {
    const url = '/v1/delivery/:id/slots?slotId={slotId}';
    const returnedUrl = '/v1/delivery/50/slots?slotId=25';

    const postRequest = createRequestAction(REQUEST_POST, url);
    const filter = postRequest({
      routeParams: { id: 50 },
      slotId: 25,
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('replaces 2 params in the url by new values from filter object', () => {
    const url = '/v1/delivery/:id/slots/:slotId';
    const returnedUrl = '/v1/delivery/50/slots/25';

    const postRequest = createRequestAction(REQUEST_POST, url);
    const filter = postRequest({
      routeParams: {
        id: 50,
        slotId: 25,
      },
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('adds limit and ofset if they are present on filter object', () => {
    const url = '/v1/delivery?limit={limit}&offset={offset}';
    const returnedUrl = '/v1/delivery?limit=50&offset=100';

    const postRequest = createRequestAction(REQUEST_POST, url);
    const filter = postRequest({
      limit: 50,
      offset: 100,
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });

  it('adds limit and ofset if they are not present on filter object', () => {
    const url = '/v1/delivery';
    const returnedUrl = '/v1/delivery?limit=50&offset=100';

    const postRequest = createRequestAction(REQUEST_POST, url);
    const filter = postRequest({
      limit: 50,
      offset: 100,
    });

    expect(addParamsToURL(filter)).toEqual(returnedUrl);
  });
});
