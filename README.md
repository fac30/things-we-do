# Things We Do

A Progressive Web Application (PWA) built with Next.js that helps users manage tasks and emotional well-being through mood tracking and personalized toolkits.

## Features

- **Mood Tracking**: Interactive 3D visualization for tracking emotional states
- **Personal Toolkit**: Customizable collection of coping strategies and resources
- **Task Management**: Priority-based task organization
- **Insights**: Data visualization of mood patterns and toolkit usage
- **PWA Support**: Installable on mobile devices with offline capabilities

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- RxDB for offline-first data storage
- Plotly.js for 3D visualizations
- Jest for testing
- Serwist for PWA capabilities

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd things-we-do
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run test`: Run Jest tests
- `npm run test:watch`: Run Jest in watch mode

### Project Structure

```src
src/
├── app/              # Next.js app router pages
├── components/       # Reusable components
├── context/         # React context providers
├── lib/             # Utilities and database logic
├── styles/          # Global styles
└── ui/              # UI components
```

## Testing

The project uses Jest and React Testing Library for testing. Tests are located in the `__tests__` directory.

Run tests with:

```bash
npm run test
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request using the provided PR template

## License

## Acknowledgments
