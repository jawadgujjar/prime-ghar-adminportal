import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  ListGroup,
} from "react-bootstrap";
import { property as propertyApi } from "../../utils/axios";

function Viewportfolio() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyApi.get(`/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading property details...</p>;

  return (
    <Container className="mt-4">
      <Row className="g-4">
        {/* Image Carousel */}
        <Col md={6}>
          <Carousel>
            {property.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  className="d-block w-100"
                  alt={`Property ${index + 1}`}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        {/* Property Details */}
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold">{property.title}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Location:</strong> {property.location.city},{" "}
                  {property.location.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Area:</strong> {property.location.area}{" "}
                  {property.location.unit}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-3 shadow-sm p-3">
            <Card.Body>
              <Card.Title>Features</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  🛏 Bedrooms: {property.features.bedrooms}
                </ListGroup.Item>
                <ListGroup.Item>
                  🚽 Bathrooms: {property.features.bathrooms}
                </ListGroup.Item>
                <ListGroup.Item>
                  🏠 Floors: {property.features.floors}
                </ListGroup.Item>
                <ListGroup.Item>
                  🚗 Garage: {property.features.garage ? "Yes" : "No"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Viewportfolio;
