import React from 'react'

const LoadingIcon = ({ dark, sizeX, ...props }) => {
  const size = sizeX ? sizeX * 30 : 30
  if (!props) {
    props = {}
  }
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{ margin: 'auto' }}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="30"
        stroke={dark ? '#466074' : '#f5f5f5'}
        strokeWidth="4"
        strokeLinecap="square"
        transform="rotate(394.371 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;180 50 50;720 50 50"
          keyTimes="0;0.5;1"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          calcMode="linear"
          values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
          keyTimes="0;0.5;1"
          dur="1.5"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}
export default LoadingIcon
