import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';

const Home = () => {
  const tours = [
    { date: 'JUL 16', city: 'DETROIT, MI', venue: 'DTE ENERGY MUSIC THEATRE' },
    { date: 'JUL 19', city: 'TORONTO, ON', venue: 'BUDWEISER STAGE' },
    { date: 'JUL 22', city: 'BRISTOW, VA', venue: 'JIGGY LUBE LIVE' },
    { date: 'JUL 29', city: 'PHOENIX, AZ', venue: 'AK-CHIN PAVILION' },
    { date: 'AUG 2', city: 'LAS VEGAS, NV', venue: 'T-MOBILE ARENA' },
    { date: 'AUG 7', city: 'CONCORD, CA', venue: 'CONCORD PAVILION' },
  ];

  return (
    <>
      <div className="bg-secondary text-center py-4 mt-5">
        <h1
          className="text-white fw-bold"
          style={{ fontSize: '6rem', fontFamily: 'Times New Roman' }}
        >
          The Generics
        </h1>
      </div>

      <div style={{ backgroundColor: '#ccc', padding: '3rem 0' }}>
        <Container className="text-center">
          <Button
            variant="outline-dark"
            className="mb-3 fw-bold"
            style={{ fontSize: '1.2rem', padding: '0.5rem 2rem' }}
          >
            Get our Latest Album
          </Button>
          <div>
            <Button
              variant="outline-dark"
              style={{ borderRadius: '50%', width: '60px', height: '60px' }}
            >
              <FaPlay />
            </Button>
          </div>
        </Container>
      </div>

      <Container className="my-4">
        <h2 className="text-center mb-4" style={{ fontFamily: 'Times New Roman' }}>
          TOURS
        </h2>
        {tours.map((tour, index) => (
          <Row
            key={index}
            className="align-items-center justify-content-between mb-3 px-2 px-md-5"
          >
            <Col xs={12} md={3} className="fw-bold">
              {tour.date}
            </Col>
            <Col xs={12} md={3}>
              {tour.city}
            </Col>
            <Col xs={12} md={4}>
              {tour.venue}
            </Col>
            <Col xs={12} md={2} className="text-md-end">
              <Button variant="info" style={{ color: '#fff' }} className="fw-bold">
                BUY TICKETS
              </Button>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default Home;