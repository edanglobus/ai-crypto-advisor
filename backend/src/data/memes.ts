export interface Meme {
  id: string;
  title: string;
  imageUrl: string;
}

// Curated static memes (imgflip CDN — stable, no auth). One is picked at random
// each time the dashboard refreshes.
export const MEMES: Meme[] = [
  { id: 'meme-1', title: 'When you finally buy the dip', imageUrl: 'https://i.imgflip.com/30b1gx.jpg' },
  { id: 'meme-2', title: 'HODL through the volatility', imageUrl: 'https://i.imgflip.com/1bij.jpg' },
  { id: 'meme-3', title: 'Checking the portfolio every 5 minutes', imageUrl: 'https://i.imgflip.com/26am.jpg' },
  { id: 'meme-4', title: 'Me vs my paper hands', imageUrl: 'https://i.imgflip.com/1ur9b0.jpg' },
  { id: 'meme-5', title: 'Diamond hands vs the market', imageUrl: 'https://i.imgflip.com/1g8my4.jpg' },
  { id: 'meme-6', title: 'To the moon, eventually', imageUrl: 'https://i.imgflip.com/4t0m5.jpg' },
];
