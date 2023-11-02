import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: false,
    infinite: true,
    speed: 1000, // Adjust the speed (1 second = 1000ms)
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1500, 
};

const clients = [
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/63/a2-63943872.webp",
    "name": "Item 1",
    "link_url": "https://example.com/item1"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/91/a1-91351dde.webp",
    "name": "Item 2",
    "link_url": "https://example.com/item2"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/84/a3-84dbd929.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/5d/a4-5da7756b.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/ba/a5-bae89430.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/48/a6-4849b19c.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/af/a7-af0650c7.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/21/a8-21c1ef59.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/c6/a9-c68e0e02.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  },
  {
    "image": "https://strategicgears.com/templates/yootheme/cache/63/a10-633ed90b.webp",
    "name": "Item 3",
    "link_url": "https://example.com/item3"
  }
];

const OurClients = () => {
  return (
    <div className="container mb-3">
      <div className="row">
        <div className='text-center'>
          {/* <h2>Our Clients</h2> */}
          <Slider {...settings}>
            {clients.map((client:any, index:any) => (
              <div key={index}>
                <a href={client.link_url} target="_blank" rel="noopener noreferrer">
                  <img src={client.image} alt={client.name} className='img-fluid' width='100px'/>
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
