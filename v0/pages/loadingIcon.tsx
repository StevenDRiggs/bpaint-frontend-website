import React from 'react'


const LoadingIcon = () => {
  return (
    <main>
      <svg width='750' height='750' viewBox='0 0 750 750' preserveAspectRatio='xMidYMid'>
        <rect x='0' y='0' width='750' height='750' fill='#eee' />

        <defs>
          <mask id='butterflyAntennaeMask'>
            <ellipse cx='375' cy='275' rx='21' ry='25' fill='white' />
          </mask>
          <mask id='curvyButterflyWingsMaskInner'>
            <rect x='125' y='255' width='500' height='250' fill='black' />
            <circle cx='500' cy='380' r='125' fill='white' />
            <circle cx='250' cy='380' r='125' fill='white' />
          </mask>
          <mask id='curvyButterflyWingsMaskOuter'>
            <rect x='125' y='245' width='500' height='250' fill='white' />
            <circle cx='500' cy='380' r='125' fill='black' />
            <circle cx='250' cy='380' r='125' fill='black' />
          </mask>
          <filter id='curvyButterflyWingsFilter'>
            <feTurbulence baseFrequency='0.025' result='turbulence' />
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>

        <g id='wholeButterfly' transform='rotate(65, 375, 375)'>

          <g id='leftButterflyWing'>
            <g id='leftButterflyWingUnaltered' mask='url(#curvyButterflyWingsMaskOuter)'>
              <rect x='152' y='200' rx='50' ry='30'  width='125' height='125' fill='#eee' stroke='black' transform='skewX(15) skewY(15)' />
            </g>

            <g id='leftButterflyWingAltered' mask='url(#curvyButterflyWingsMaskInner)' filter='url(#curvyButterflyWingsFilter)'>
              <rect x='295' y='407' rx='25' ry='40' width='125' height='90' fill='#eee' stroke='black' transform='skewX(-10) skewY(-5)' />
              <rect x='140' y='200' rx='50' ry='30'  width='125' height='125' fill='#eee' stroke='black' transform='skewX(15) skewY(15)' />
            </g>
          </g>

          <g id='rightButterflyWing'>
            <g id='rightButterflyWingUnaltered' mask='url(#curvyButterflyWingsMaskOuter)'>
              <rect x='473' y='400' rx='50' ry='30' width='125' height='125' fill='#eee' stroke='black' transform='skewX(-15) skewY(-15)' />
            </g>

            <g id='rightButterflyWingAltered' mask='url(#curvyButterflyWingsMaskInner)' filter='url(#curvyButterflyWingsFilter)'>
              <rect x='315.5' y='343' rx='25' ry='40' width='125' height='90' fill='#eee' stroke='black' transform='skewX(10) skewY(4)' />
              <rect x='473' y='395' rx='50' ry='30' width='125' height='125' fill='#eee' stroke='black' transform='skewX(-15) skewY(-15)' />
            </g>
          </g>

          <g id='butterflyHead'>
            <ellipse cx='359' cy='295' rx='12.5' ry='28.5' fill='#eee' stroke='black' mask='url(#butterflyAntennaeMask)' />
            <ellipse cx='391' cy='295' rx='12.5' ry='28.5' fill='#eee' stroke='black' mask='url(#butterflyAntennaeMask)' />
            <circle cx='375' cy='302.5' r='12.5' fill='#eee' stroke='black' />
            <circle cx='365' cy='297.5' r='4.5' fill='#eee' stroke='black' />
            <circle cx='385' cy='297.5' r='4.5' fill='#eee' stroke='black' />
            <circle cx='355' cy='270' r='3.5' fill='#eee' stroke='black' />
            <circle cx='395' cy='270' r='3.5' fill='#eee' stroke='black' />
            <circle cx='356' cy='271' r='2' fill='#eee' stroke='black' />
            <circle cx='394' cy='271' r='2' fill='#eee' stroke='black' />
          </g>

          <g id='butterflyBody'>
            <ellipse cx='375' cy='405' rx='7.5' ry='15' fill='#eee' stroke='black' />
            <ellipse cx='375' cy='390' rx='10' ry='20' fill='#eee' stroke='black' />
            <ellipse cx='375' cy='375' rx='12.5' ry='25' fill='#eee' stroke='black' />
            <ellipse cx='375' cy='360' rx='15' ry='25' fill='#eee' stroke='black' />
            <ellipse cx='375' cy='340' rx='17.5' ry='27.5' fill='#eee' stroke='black' />
          </g>

        </g>
      </svg>
    </main>
  )
}


export default LoadingIcon
