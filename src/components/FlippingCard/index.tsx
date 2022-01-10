import React, { useEffect, useState, useRef } from 'react'
import { View, Animated, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

type BackCardBody = React.FunctionComponent<{ data: object }>
type FrontCard = React.FunctionComponent<any>
type BackCard = React.FunctionComponent<any>
type FlippingCard = React.FunctionComponent<{
  direction?: 'horizontal' | 'vertical'
  deleteAction: any
  updateAction: any
  id: string
}> & { Front: FrontCard; Back: BackCard; BackBody: BackCardBody }

export const FlippingCard: FlippingCard = ({
  children,
  direction = 'horizontal',
  deleteAction,
  updateAction,
  id,
}) => {
  const [flipped, setFlipped] = useState(false)
  const animatedVal = useRef(new Animated.Value(0)).current
  const flipCard = () => {
    setFlipped(!flipped)
  }

  useEffect(() => {
    if (flipped) {
      Animated.timing(animatedVal, {
        toValue: 180,
        duration: 500,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(animatedVal, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start()
    }
  })

  const styles = styleSheet()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.editButton}>
        <Icon.Button name="edit" color="black" size={30} onPress={updateAction}>
          <Text style={styles.actionText}>Edit</Text>
        </Icon.Button>
      </View>
      <View style={styles.deleteButton}>
        <Icon.Button
          name="trash"
          size={30}
          backgroundColor="#FF4F4B"
          color="black"
          onPress={() => deleteAction({ variables: { id } })}
        >
          <Text style={styles.actionText}>Delete</Text>
        </Icon.Button>
      </View>
      <Pressable onPress={flipCard}>
        {Array.isArray(children)
          ? children.map(child => {
              return React.cloneElement(child, {
                animatedVal,
                direction,
              })
            })
          : null}
      </Pressable>
    </View>
  )
}

const FrontCard: FrontCard = props => {
  const { animatedVal, direction, children } = props
  const styles = styleSheet()
  const frontInterpolate = animatedVal.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
  let frontAnimatedStyle
  if (direction === 'horizontal') {
    frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] }
  } else {
    frontAnimatedStyle = { transform: [{ rotateX: frontInterpolate }] }
  }

  return (
    <Animated.View style={[styles.frontCard, frontAnimatedStyle]}>
      <Text style={styles.frontText}>{children}</Text>
    </Animated.View>
  )
}
const BackCard: BackCard = props => {
  const { animatedVal, direction, children } = props
  const styles = styleSheet()
  const backInterpolate = animatedVal.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  })

  let backAnimatedStyle
  if (direction === 'horizontal') {
    backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] }
  } else {
    backAnimatedStyle = { transform: [{ rotateX: backInterpolate }] }
  }

  return (
    <Animated.View style={[styles.frontCard, backAnimatedStyle]}>
      {children}
    </Animated.View>
  )
}
const BackCardBody = ({ data }) => {
  const styles = styleSheet()
  return (
    <View style={styles.backCardbody}>
      {Object.entries(data).map(([key, value]) => {
        if (
          String(key) !== 'multipleChoice' &&
          String(key) !== 'writeInAnswer' &&
          String(key) !== 'correctAnswer'
        ) {
          if (String(key) === data.correctAnswer) {
            const correctStyle = { backgroundColor: '#66FF33' }
            return (
              <View style={[styles.backCardBodyItem, correctStyle]}>
                <Text style={styles.BackCardBodyItemText}>{value}</Text>
              </View>
            )
          } else {
            return (
              <View style={[styles.backCardBodyItem]}>
                <Text style={styles.BackCardBodyItemText}>{value}</Text>
              </View>
            )
          }
        }
      })}

      <Text style={styles.backCardBodyText}>
        Write In: {data.writeInAnswer}
      </Text>

      <Text style={styles.backCardBodyText}>
        {data.multipleChoice ? 'Multiple Choice' : 'Write In Answer'}
      </Text>
    </View>
  )
}

FlippingCard.Front = FrontCard
FlippingCard.Back = BackCard
FlippingCard.BackBody = BackCardBody

const styleSheet = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      width: '90%',
      height: '40%',
      borderRadius: 5,
      margin: '5%',
      marginTop: '20%',
      paddingBottom: '80%',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    deleteButton: {
      position: 'absolute',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      top: -60,
      right: 0,
      marginRight: '5%',
    },
    editButton: {
      position: 'absolute',
      width: 60,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      top: -60,
      left: 0,
      marginLeft: 10,
    },
    actionText: {
      fontWeight: 'bold',
    },
    frontCard: {
      width: '100%',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      borderRadius: 5,
      position: 'absolute',
    },
    frontText: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    backCard: {
      position: 'absolute',
      top: 0,
    },
    backCardbody: {
      width: '100%',
      height: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: '10%',
    },
    backCardBodyItem: {
      width: '45%',
      height: '30%',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#D3D3D3',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: 5,
      marginHorizontal: 5,
      marginBottom: 5,
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    BackCardBodyItemText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    backCardBodyText: {
      width: '95%',
      height: '10%',
      marginHorizontal: 10,
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignContent: 'center',
    },
  })
}
