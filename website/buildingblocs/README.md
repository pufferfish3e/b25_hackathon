# Percepta 

Percepta is a smart, attachable camera that clips onto your glasses, running a lightweight ML model to continuously analyze your surroundings in real-time. Connected to a companion app, it detects nearby hazards and provides audio feedback to enhance awareness and transform how you interact with the world.

## Why Percepta?

• **Smart Detection**: Our lightweight ML model uses CNNs to continuously analyze your environment in real-time, identifying common walkway hazards like stairs, curbs, potholes, and uneven surfaces. The system instantly flags potential risks for proactive support and safety.

• **Hands-Free Alerts**: Get immediate, context-aware audio notifications directly through the device and your phone. Alert urgency automatically adjusts based on hazard severity and proximity, keeping you informed without overwhelming you.

• **GPS Hazard Mapping**: Every detected hazard is mapped and GPS-tagged, creating an evolving city map that warns you before reaching problem areas. Plan safer routes in real-time with advance notifications about potential obstacles.

• **Community Intelligence**: Each detection is anonymously shared with users and local authorities, building a live hazard awareness network. Your personal safety alerts contribute to collective intelligence that benefits everyone's daily commutes and emergency response.

## Who can benefit from Percepta?

Percepta is designed to empower blind and visually impaired individuals with greater awareness and safety in their surroundings. Whether you're navigating busy streets, exploring unfamiliar areas, or managing daily tasks, Percepta offers real-time support to help you stay informed, confident, and independent.

## Tech Stack

PWA
- Next.js
- Tailwind CSS
- React-Three-Fiber (for 3D rendering)
- Leafet (for map)
- Framer Motion

Model
- Keras (Tensorflow)

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation (PWA)

1. Navigate to the website directory:

```bash
cd website/buildingblocs
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Components

### Interactive Map

Community hazard mapping with:

-   Real-time user location detection
-   50+ sample hazard markers
-   Animated markers and popups
-   Legend and error handling

### File Upload

Drag-and-drop interface supporting:

-   Image validation (JPG, PNG, GIF, BMP)
-   5MB file size limit
-   Preview functionality
-   Error handling

## Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint


## Contributing

This project was created for the B25 Hackathon by Team Percepta:

-   Kendrick
-   Wei Chong
-   Tony
-   Mahek

## License

MIT License - see [LICENSE](../../LICENSE) file for details.
