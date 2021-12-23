import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  GestureResponderEvent,
} from 'react-native'

export const Card = ({ children }: { children: any }) => {
  const styles = styleSheet()
  return <View style={styles.card}>{children}</View>
}

const CardHeader = ({ children }: { children: string }) => {
  const styles = styleSheet()
  return (
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeaderText}>
        {children.length > 15 ? `${children.substring(0, 15)}...` : children}
      </Text>
    </View>
  )
}

const CardBody = ({
  children = {},
  action,
}: {
  children: object
  action?: { title: string; onPress: (event: GestureResponderEvent) => void }
}) => {
  const styles = styleSheet()
  return (
    <View style={styles.cardBody}>
      {Object.entries(children).map(([key, value]) => {
        return (
          <View style={styles.cardBodyItem}>
            <Text style={styles.cardBodyItemText}>{key}</Text>
            <Text style={styles.cardBodyItemText}>{value}</Text>
          </View>
        )
      })}
      <Button color="black" title={action.title} onPress={action.onPress} />
    </View>
  )
}

Card.Header = CardHeader
Card.Body = CardBody

const styleSheet = () => {
  return StyleSheet.create({
    card: {
      flex: 0.25,
      width: '90%',
      height: '30%',
      borderRadius: 5,
      margin: '5%',
      backgroundColor: '#4cc9f0',
    },
    cardHeader: {
      display: 'flex',
      width: '100%',
      height: '20%',
      backgroundColor: '#4895ef',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      alignItems: 'flex-start',
    },
    cardHeaderText: {
      marginLeft: '5%',
      fontSize: 30,
      justifyContent: 'center',
    },
    cardBody: {
      display: 'flex',

      width: '100%',
      height: '100%',
      backgroundColor: 'green',
    },
    cardBodyItem: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    cardBodyItemText: {
      margin: '1%',
    },
  })
}
