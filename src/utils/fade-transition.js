const fade = ({position, scene}) => {
  const {index} = scene

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
    inputRange: [index - 0.7, index, index + 0.7],
    outputRange: [0.0, 1, 1.0]
  })

  return {
    opacity,
    transform: [{translateX}, {translateY}]
  }
}

export default fade
