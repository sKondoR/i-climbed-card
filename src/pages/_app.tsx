import React from 'react';
import { EditImage } from '../ui/EditImage';
import './globals.css';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Edit Route Image Microfrontend</h1>
      <p>This is the home page of the shop app, running on its own.</p>
      <EditImage
        imgSrc=""
        name="Воин света"
        grade="7b+"
        region="Карельский перешеек/Треугольное"
      />
    </div>
  );
}