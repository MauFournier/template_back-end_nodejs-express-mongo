import {
  addFakeUndefinedMongoVersioningField,
  removeMongoVersionFields,
  removeMongoVersionFieldsFromSingleRecord,
} from './utils';

export const aResource1 = {
  _id: 'id_aResource1',
  createdAt: '2020-10-29T12:00:00.000Z',
  updatedAt: '2020-10-29T12:00:00.000Z',
};

export const aResource2 = {
  _id: 'id_aResource2',
  createdAt: '2020-10-30T12:00:00.000Z',
  updatedAt: '2020-10-30T12:00:00.000Z',
};

describe('Shared Utils', () => {
  describe('removeMongoVersionFieldsFromSingleRecord', () => {
    it('should remove the __v field from a single record', async () => {
      const resource = {
        ...aResource1,
        __v: 0,
      };

      const resourceWithoutMongoVersioningField =
        removeMongoVersionFieldsFromSingleRecord(resource);

      expect('__v' in resourceWithoutMongoVersioningField).toBe(false);
    });
  });

  describe('removeMongoVersionFields', () => {
    it('should remove the __v field from a single record', async () => {
      const resource = {
        ...aResource1,
        __v: 0,
      };

      const resourceWithoutMongoVersioningField =
        removeMongoVersionFields(resource);

      expect('__v' in resourceWithoutMongoVersioningField).toBe(false);
    });

    it('should remove the __v field from multiple records', async () => {
      const resources = [
        {
          ...aResource1,
          __v: 0,
        },
        {
          ...aResource2,
          __v: 0,
        },
      ];

      const resourcesWithoutMongoVersioningField =
        removeMongoVersionFields(resources);

      expect('__v' in resourcesWithoutMongoVersioningField[0]).toBe(false);
      expect('__v' in resourcesWithoutMongoVersioningField[1]).toBe(false);
    });
  });

  describe('addFakeUndefinedMongoVersioningField', () => {
    it('should add a fake __v field', async () => {
      const resource = {
        _id: 'id_resource1',
        title: 'Example resource 1',
        description: 'Example resource 1 description',
        status: 'Pending',
        userId: 'id_user1',
        createdAt: '2022-10-29T12:00:00.000Z',
        updatedAt: '2022-10-29T12:00:00.000Z',
      };

      const resourceWithFakeMongoVersioningField =
        addFakeUndefinedMongoVersioningField(resource);

      expect(resourceWithFakeMongoVersioningField).toEqual({
        ...resource,
        __v: undefined,
      });
    });
  });
});
