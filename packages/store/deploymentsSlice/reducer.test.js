/*eslint import/namespace: ['error', { allowComputed: true }]*/
import reducer, { actions, initialState } from '.';
import { defaultState } from '../../../../tests/mockData';
import { DEPLOYMENT_STATES } from './constants';

describe('deployment reducer', () => {
  it('should return the initial state', async () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle RECEIVE_DEPLOYMENT', async () => {
    expect(reducer(undefined, { type: actions.receivedDeployment, payload: defaultState.deployments.byId.d1 }).byId.d1).toEqual(
      defaultState.deployments.byId.d1
    );
    expect(reducer(initialState, { type: actions.receivedDeployment, payload: defaultState.deployments.byId.d1 }).byId.d1).toEqual(
      defaultState.deployments.byId.d1
    );
  });
  it('should handle RECEIVE_DEPLOYMENTS', async () => {
    const { statistics } = defaultState.deployments.byId.d1;
    expect(reducer(undefined, { type: actions.receivedDeployments, payload: { plain: 'passing' } }).byId.plain).toBeTruthy();
    expect(
      reducer(initialState, { type: actions.receivedDeployments, payload: { [defaultState.deployments.byId.d1.id]: { statistics } } }).byId.d1.statistics
    ).toBeTruthy();
  });
  it('should handle RECEIVE_DEPLOYMENT_DEVICE_LOG', async () => {
    expect(
      reducer(undefined, {
        type: actions.receivedDeploymentDeviceLog,
        payload: { id: defaultState.deployments.byId.d1.id, deviceId: defaultState.deployments.byId.d1.devices.a1.id, log: 'foo' }
      }).byId.d1.devices.a1.log
    ).toEqual('foo');
    expect(
      reducer(initialState, {
        type: actions.receivedDeploymentDeviceLog,
        payload: { id: defaultState.deployments.byId.d1.id, deviceId: defaultState.deployments.byId.d1.devices.a1.id, log: 'bar' }
      }).byId.d1.devices.a1.log
    ).toEqual('bar');
  });
  it('should handle RECEIVE_DEPLOYMENT_DEVICES', async () => {
    const { devices, id } = defaultState.deployments.byId.d1;
    expect(
      reducer(undefined, {
        type: actions.receivedDeploymentDevices,
        payload: { id, devices, selectedDeviceIds: [devices.a1.id], totalDeviceCount: 500 }
      }).byId.d1.totalDeviceCount
    ).toEqual(500);
    expect(
      reducer(defaultState.deployments, {
        type: actions.receivedDeploymentDevices,
        payload: { id, devices, selectedDeviceIds: [devices.a1.id], totalDeviceCount: 500 }
      }).byId.d1.statistics
    ).toEqual(defaultState.deployments.byId.d1.statistics);
  });
  it('should handle RECEIVE_<deploymentstatus>_DEPLOYMENTS', async () => {
    Object.values(DEPLOYMENT_STATES).forEach(status => {
      expect(reducer(undefined, { type: actions.receivedDeploymentsForStatus, payload: { deploymentIds: ['a1'], total: 1, status } }).byStatus[status]).toEqual(
        { deploymentIds: ['a1'], total: 1 }
      );
      expect(
        reducer(initialState, { type: actions.receivedDeploymentsForStatus, payload: { deploymentIds: ['a1'], total: 1, status } }).byStatus[status]
      ).toEqual({ deploymentIds: ['a1'], total: 1 });
    });
  });
  it('should handle SELECT_<deploymentstatus>_DEPLOYMENTS', async () => {
    Object.values(DEPLOYMENT_STATES).forEach(status => {
      expect(
        reducer(undefined, { type: actions.selectDeploymentsForStatus, payload: { deploymentIds: ['a1'], status } }).selectionState[status].selection
      ).toEqual(['a1']);
      expect(
        reducer(initialState, { type: actions.selectDeploymentsForStatus, payload: { deploymentIds: ['a1'], status } }).selectionState[status].selection
      ).toEqual(['a1']);
    });
  });
  it('should handle SET_DEPLOYMENTS_STATE', async () => {
    const newState = { something: 'new' };
    expect(reducer(undefined, { type: actions.setDeploymentsState, payload: newState }).selectionState).toEqual(newState);
    expect(reducer(initialState, { type: actions.setDeploymentsState, payload: newState }).selectionState).toEqual(newState);
  });
  it('should handle REMOVE_DEPLOYMENT', async () => {
    let state = reducer(undefined, { type: actions.receivedDeployment, payload: defaultState.deployments.byId.d1 });
    expect(reducer(state, { type: actions.removedDeployment, payload: defaultState.deployments.byId.d1.id }).byId).toEqual({});
    expect(reducer(initialState, { type: actions.removedDeployment, payload: 'a1' }).byId).toEqual({});
  });
  it('should handle CREATE_DEPLOYMENT', async () => {
    expect(reducer(undefined, { type: actions.createdDeployment, payload: { name: 'test', id: 'test' } }).byId.test.devices).toEqual({});
    expect(reducer(initialState, { type: actions.createdDeployment, payload: { name: 'test', id: 'a1' } }).byStatus.pending.deploymentIds).toContain('a1');
  });
  it('should handle SET_DEPLOYMENTS_CONFIG', async () => {
    expect(reducer(undefined, { type: actions.setDeploymentsConfig, payload: { name: 'test' } }).config).toEqual({ name: 'test' });
    expect(reducer(initialState, { type: actions.setDeploymentsConfig, payload: { name: 'test' } }).config).toEqual({ name: 'test' });
  });
});
