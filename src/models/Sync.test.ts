import axios from 'axios';
import { Sync } from './Sync';

import { Movie } from './Attributes.test';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const movies = [
  { id: 1, title: 'Dracula', description: 'Bran Stocker' },
  { id: 2, title: 'Hotel Transilvania', description: '3D animation' },
];

describe('Sync', () => {
  const sync = new Sync<Movie>('some-url');

  it('should return list', async () => {
    // given
    mockedAxios.get.mockResolvedValueOnce(movies[0]);
    // when
    const result = await sync.fetch(1);
    // then
    expect(axios.get).toHaveBeenCalledWith('some-url/1');
    expect(result).toEqual(movies[0]);
  });

  describe('save', () => {
    it('should update when have id', () => {
      const updated = {
        id: 2,
        title: 'Shark',
        description: 'something here',
      };

      sync.save(updated);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        'some-url/2',
        expect.objectContaining({ title: updated.title, id: 2 })
      );
    });

    it('should create new one', () => {
      const another = {
        title: 'New Title',
        description: 'believe or not',
      };

      sync.save(another);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        'some-url',
        expect.objectContaining({
          title: another.title,
          description: another.description,
        })
      );
    });
  });
});
