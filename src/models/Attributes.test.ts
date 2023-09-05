import { Attributes } from './Attributes';

interface Movie {
  title?: string;
  description?: string;
  review?: number;
  watched?: boolean;
}

describe('Attributes', () => {
  const movie = {
    title: 'Scarface',
    description: 'Tony Montana and his close friend Manny...',
    review: 8,
    watched: true,
  };

  const attrs = new Attributes<Movie>(movie);

  describe('get()', () => {
    it('should have access to properties', () => {
      expect(attrs.get('title')).toBe(movie.title);
      expect(attrs.get('description')).toBe(movie.description);
      expect(attrs.get('review')).toBe(movie.review);
      expect(attrs.get('watched')).toBe(movie.watched);
    });

    it('should parse prop type correctly', () => {
      expect(typeof attrs.get('title')).toBe('string');
      expect(typeof attrs.get('review')).toBe('number');
      expect(typeof attrs.get('watched')).toBe('boolean');
    });
  });

  describe('set()', () => {
    it('should update a prop correctly', () => {
      expect(attrs.get('title')).toBe(movie.title);
      attrs.set({ title: 'new movie title' });
      expect(attrs.get('title')).toBe('new movie title');
    });
  });

  describe('getAll()', () => {
    it('should return all fields', () => {
      const all = attrs.getAll();
      expect(all).toBe(movie);
      expect(Object.keys(all).length).toBe(Object.keys(movie).length);
    });
  });
});
