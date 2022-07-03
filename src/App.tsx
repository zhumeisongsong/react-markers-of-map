import { useCallback, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import markerIcon from "./map-marker.svg";
import markerIconActive from "./map-marker-active.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import bgImage from "./bg.jpeg";

const MarkerContainer = styled.section`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
`;

const Marker = styled.div`
  position: absolute;
  transition: all 0.2s ease-in-out;
`;

const MarkerImg = styled.img`
  transition: all 0.2s ease-in-out;
`;

const CurrentLocation = styled.div`
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding-bottom: 4px;
`;

const SwiperContainer = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
`;

const PlaceCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: #999;
  border-radius: 8px;
  color: #fff;
`;

function App() {
  const [swiper, setSwiper] = useState<any>(null);
  const [activeMarker, setActiveMarker] = useState(1);
  const [markers, setMarkers] = useState([
    { id: 1, name: "Place 1", position: [50, 30] },
    { id: 2, name: "Place 2", position: [80, 40] },
    { id: 3, name: "Place 3", position: [20, 20] },
    { id: 4, name: "Place 4", position: [30, 30] },
    { id: 5, name: "Place 5", position: [55, 45] }
  ]);

  const onMarkerClick = useCallback(
    (index: number) => {
      swiper.slideTo(index);
    },
    [swiper]
  );

  return useMemo(
    () => (
      <>
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          maxScale={3}
        >
          {({
            zoomIn,
            zoomOut,
            setTransform,
            resetTransform,
            centerView,
            zoomToElement,
            ...rest
          }) => (
            <>
              <SwiperContainer>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={2}
                  centeredSlides={true}
                  onSlideChange={(swiper) => {
                    zoomToElement(String(swiper.activeIndex + 1), 2);
                    setActiveMarker(swiper.activeIndex + 1);
                  }}
                  onSwiper={(swiper) => setSwiper(swiper)}
                >
                  {markers.map((marker, index) => (
                    <SwiperSlide key={index}>
                      <PlaceCard>{marker.name}</PlaceCard>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperContainer>
              <TransformComponent>
                <img height="900px" src={bgImage} alt="map" />

                <MarkerContainer>
                  {markers.map((marker, index) => (
                    <Marker
                      onClick={() => onMarkerClick(index)}
                      style={{
                        left: marker.position[0] + "%",
                        top: marker.position[1] + "%"
                      }}
                    >
                      <CurrentLocation
                        style={
                          activeMarker === index + 1
                            ? { height: "auto" }
                            : { height: 0, opacity: 0 }
                        }
                      >
                        現在地
                      </CurrentLocation>

                      <MarkerImg
                        key={index}
                        width={44}
                        id={String(index + 1)}
                        src={
                          activeMarker === index + 1
                            ? markerIconActive
                            : markerIcon
                        }
                        alt={`marker${index + 1}`}
                        style={{
                          pointerEvents: "visible"
                        }}
                      />
                    </Marker>
                  ))}
                </MarkerContainer>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </>
    ),
    [activeMarker, markers, onMarkerClick]
  );
}

export default App;
