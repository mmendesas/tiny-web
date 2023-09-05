import axios from 'axios';

import { MovieProps } from './Attributes.test';
import { Collection } from './Collection';

import { Model } from './Model';
import { Attributes } from './Attributes';
import { Events } from './Events';
import { Sync } from './Sync';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const movies = [
  { id: 1, title: 'Dracula', description: 'Bran Stocker' },
  { id: 2, title: 'Hotel Transilvania', description: '3D animation' },
];

const FAKE_URL = 'http://somewhere.com';

class Movie extends Model<MovieProps> {
  static buildMovie(data: MovieProps) {
    return new Movie(
      new Attributes<MovieProps>(data),
      new Events(), //
      new Sync<MovieProps>(FAKE_URL)
    );
  }
}

describe('collection', () => {
  const collection = new Collection<Movie, MovieProps>(
    FAKE_URL,
    (json: MovieProps) => Movie.buildMovie(json)
  );

  const callback = jest.fn();
  collection.on('change', () => {
    callback(collection.models.length);
  });

  it('should fetch api and populate models', async () => {
    // fake api response
    mockedAxios.get.mockResolvedValue({ data: movies });

    // before
    expect(collection.models.length).toEqual(0);
    await collection.fetch();

    // after
    expect(collection.models.length).toEqual(2);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(movies.length);
  });
});
