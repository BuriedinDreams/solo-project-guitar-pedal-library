import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
        <p> This application is a Guitar Pedal Library social media site. In this application you will be able to look through 
          a vast collection of physical guitar pedals. What makes this application unique is, it has the ability to add photos of guitar pedals, add YouTube videos, and add a description. 
          You will also be able update said information using the edit mode on the details page. 
        </p>
    </div>
  );
}

export default AboutPage;
