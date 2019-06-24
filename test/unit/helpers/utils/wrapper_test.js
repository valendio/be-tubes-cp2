const assert = require('assert');
const sinon = require('sinon');

const wrapper = require('../../../../bin/helpers/utils/wrapper');

describe('Wrapper', () => {

  describe('paginationData', () => {
    it('should success', () => {
      const res = wrapper.paginationData({}, {});
      assert(res.data, {});
      assert(res.meta, {});
    });
  });

  describe('paginationResponse', () => {
    it('should success', () => {
      wrapper.paginationResponse({ send: sinon.stub() }, 'success', { data: {}, meta: {}}, '', 200);
    });
    it('should error', () => {
      wrapper.paginationResponse({ send: sinon.stub() }, 'fail', { data: {}, err: {}}, '', 409);
    });
    it('should cover branch', () => {
      wrapper.paginationResponse({ send: sinon.stub() }, 'fail', { data: {}, err: {}});
    });
  });

  describe('response', () => {
    it('should cover branch', () => {
      wrapper.response({ send: sinon.stub() }, 'success', { data: {}, meta: {}});
    });
  });
});
