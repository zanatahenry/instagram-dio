import React, {useState, useEffect} from 'react'
import Animated from 'react-native-reanimated'
import PropTypes from 'prop-types'

import { Small, Original } from './styles'

const AnimatedOriginal = Animated.createAnimatedComponent(Original)

export default function FeedImage({
  smallSource,
  source,
  shouldLoad = false,
  aspectRatio = 1,
}) {

  const opacity = new Animated.Value(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if(shouldLoad){
      setTimeout(() =>{
        setLoaded(true)
      }, 1000)
    }
  }, [shouldLoad])

  function handleAnimate (){
    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }
  
  return(
    <Small 
      source={smallSource}
      aspect={aspectRatio}
      resizeMode="contain"
      blurRadius={3}
    >
      {loaded && (
        <AnimatedOriginal
        style = {{ opacity }}
        onLoadEnd={handleAnimate}
        source={source}
        aspect={aspectRatio}
        resizeMode="contain"
        />
      )}

    </Small>
  )
}

FeedImage.propTypes = {
  smallSource: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  shouldLoad: PropTypes.boolean,
  aspectRatio: PropTypes.number,
};

FeedImage.defaultProps = {
  shouldLoad: false,
  aspectRatio: 1,
}