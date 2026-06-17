module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#090909',
        'charcoal': '#121212',
        'sakura-pink': '#ff8ac2',
        'blossom-pink': '#ffc7de',
        'lantern': '#ffb86b',
        'wood-brown': '#4a2c1d',
        'stone-gray': '#8c8c8c',
        'emerald': '#59d98e'
      },
      boxShadow: {
        'neon-pink': '0 6px 30px rgba(255,138,194,0.12), 0 2px 6px rgba(255,138,194,0.08)'
      }
    }
  },
  plugins: []
}
