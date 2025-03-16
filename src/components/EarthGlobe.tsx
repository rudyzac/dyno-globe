import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React from 'react';
import { WorldAtlas } from 'topojson';
import { feature } from 'topojson-client';
import { v4 as uuidv4 } from 'uuid';

type EarthGlobeProps = {
  worldAtlas: WorldAtlas;
  width: number;
  height: number;
};

type EarthGlobeState = {
  countries: FeatureCollection<Geometry, GeoJsonProperties>;
  earthGlobeSvg: React.RefObject<SVGElement>;
}; // test commit

export default class EarthGlobe extends React.Component<
  EarthGlobeProps,
  EarthGlobeState
> {
  private width: number;
  private height: number;
  private projection: GeoProjection;

  constructor(props: EarthGlobeProps) {
    super(props);
    this.state = {
      countries: feature(
        this.props.worldAtlas,
        this.props.worldAtlas.objects.countries,
      ),
      earthGlobeSvg: React.createRef(),
    };

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.projection = geoMercator().fitSize(
      [this.width, this.height],
      this.state.countries,
    );
  }

  render() {
    return (
      <svg width={this.width} height={this.height}>
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
    );
  }
}
