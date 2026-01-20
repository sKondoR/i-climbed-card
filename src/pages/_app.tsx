import React from 'react';
import EditImage from '../ui/EditImage';
import './globals.css';
import imageMock from 'src/mocks/image.json';

export interface EditImageProps {
  imgSrc: string;
  name: string;
  grade: string;
  region: string;
}

export default function HomePage() {

  const {
    imgSrc,
    name,
    grade,
    region,
  } = imageMock as EditImageProps;

  return (
    <div className="">
      <div className="text-center p-5">
        <h1 className="text-2xl text-pink-700">Welcome to the IClimbedCard</h1>
        <p>This is the home page of the microfrontend app, running on its own.</p>
        <h2 className="text-xl text-pink-700">DEMO:</h2>
      </div>
      <EditImage
        imgSrc={imgSrc}
        name={name}
        grade={grade}
        region={region}
      />
    </div>
  );
}