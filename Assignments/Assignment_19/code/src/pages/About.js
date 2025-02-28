import React from 'react';
import { Container, Image } from 'react-bootstrap';

const About = () => {
  return (
    <div>
      <div className="bg-secondary text-center py-4 mt-5">
        <h1
          className="text-white fw-bold"
          style={{ fontSize: '6rem', fontFamily: 'Times New Roman' }}
        >
          The Generics
        </h1>
      </div>

      <Container className="my-5">
        <div>
          <Image
            src="https://raw.githubusercontent.com/prasadyash2411/ecom-website/main/img/Band%20Members.png"
            alt="Band Members"
            fluid
            style={{ float: 'left', marginRight: '20px', width: '30%' }}
          />
          <p style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
            We are The Generics – a band driven by passion, creativity, and an unyielding spirit of adventure.
            From our humble beginnings playing local bars to headlining international festivals, our journey has been
            fueled by a desire to break boundaries and redefine musical genres. Our sound blends raw energy with soulful
            melodies, inviting every listener to join us on a vibrant and unforgettable ride. We believe in music that speaks
            directly to the heart, forging connections that last a lifetime. Welcome to our world of rhythm, emotion, and
            endless possibilities.
          </p>
          <p style={{ fontSize: '1.1rem', textAlign: 'justify' }}>
            Since its inception, The Generics have been a pulsating heartbeat in the music industry, forging an unparalleled
            path of musical innovation that resonates with fans worldwide. Emerging from humble beginnings, a group of visionary
            musicians united to explore the transformative power of sound and lyrics, blending influences from classic rock, jazz,
            blues, and modern electronic elements into a unique sonic tapestry that defies easy categorization. Their music is more
            than just a collection of songs—it’s an emotional journey that captures the exhilarating highs of youthful rebellion and
            the introspective depths of personal reflection, inviting listeners to experience life in all its vibrant shades. Whether
            performing in intimate venues or commanding grand festival stages, The Generics create an immersive experience that
            transcends the ordinary, turning each performance into a celebration of life’s complexities and beauty.
          </p>
          <p style={{ fontSize: '1.1rem', textAlign: 'justify', clear: 'both' }}>
            Beyond their musical prowess, The Generics have established themselves as cultural icons, using their platform to
            advocate for social change and unity. Every lyric and melody is a testament to their commitment to artistic excellence
            and the power of human connection. With each new album, they push the boundaries of creativity, experimenting with
            innovative sounds while staying true to the authentic spirit that defines them. Their journey is a vivid narrative of
            passion, perseverance, and the relentless pursuit of artistic freedom, inspiring a global community of fans to embrace
            their own unique stories. The Generics are not just a band—they are a movement, a dynamic force of nature that challenges
            norms and continues to redefine the landscape of modern music.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default About;