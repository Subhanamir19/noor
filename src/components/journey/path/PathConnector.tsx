/**
 * PathConnector Component
 *
 * SVG component that draws the dotted curved line connecting
 * day nodes in the journey path.
 */

import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { PathNode } from '@/types/journey';
import { JourneyColors, JourneySizes } from '@/constants/journeyTokens';
import { generateConnectorPath } from '@/utils/journeyPath';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PathConnectorProps {
  nodes: PathNode[];
  width: number;
  height: number;
  activeNodeIndex?: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function PathConnectorComponent({ nodes, width, height, activeNodeIndex }: PathConnectorProps) {
  const pathData = useMemo(() => generateConnectorPath(nodes), [nodes]);

  const activePathData = useMemo(() => {
    if (activeNodeIndex === undefined || activeNodeIndex < 1) return '';
    return generateConnectorPath(nodes.slice(0, activeNodeIndex + 1));
  }, [activeNodeIndex, nodes]);

  if (!pathData || nodes.length < 2) {
    return null;
  }

  return (
    <Svg
      style={styles.svg}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Path
        d={pathData}
        stroke={JourneyColors.connectorBase}
        strokeWidth={JourneySizes.connectorStrokeWidth}
        strokeDasharray={JourneySizes.connectorDashArray}
        strokeLinecap="round"
        fill="none"
      />
      {!!activePathData && (
        <Path
          d={activePathData}
          stroke={JourneyColors.connectorActive}
          strokeWidth={JourneySizes.connectorStrokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </Svg>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const PathConnector = memo(PathConnectorComponent);
