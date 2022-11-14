import { geoEqualEarth, geoPath, GeoProjection } from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { WorldAtlas } from 'topojson';
import { feature } from 'topojson-client';
import { v4 as uuidv4 } from 'uuid';

type EarthGlobeProps = {
  worldAtlas: WorldAtlas;
};

type EarthGlobeState = {
  countries: FeatureCollection<Geometry, GeoJsonProperties> | null;
  earthGlobeSvg: React.RefObject<SVGElement>;
};

export default class EarthGlobe extends React.Component<
  EarthGlobeProps,
  EarthGlobeState
> {
  private scale: number;
  private cx: number;
  private cy: number;
  private projection: GeoProjection;

  constructor(props: EarthGlobeProps) {
    super(props);
    this.state = {
      countries: feature(
        this.props.worldAtlas,
        this.props.worldAtlas.objects.countries
      ),
      earthGlobeSvg: React.createRef(),
    };

    this.scale = 200;
    this.cx = 400;
    this.cy = 150;
    this.projection = geoEqualEarth()
      .scale(this.scale)
      .translate([this.cx, this.cy])
      .rotate([0, 0]);
  }

  render() {
    return (
      <>
        <svg
          width={this.scale * 3}
          height={this.scale * 3}
          viewBox="0 0 800 450"
        >
          <g>
            {this.state.countries &&
              this.state.countries.features.map(f => {
                return (
                  <path
                    key={uuidv4()}
                    d={geoPath().projection(this.projection)(f) as string}
                  />
                );
              })}
          </g>
        </svg>
      </>
    );
  }
}
