import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export const Card = ({ children }: { children: any }) => {
  const styles = styleSheet()
  return <View style={styles.card}>{children}</View>
}

const HeaderAction = ({
  deleteAction,
  editAction,
}: {
  deleteAction?: any
  editAction?: any
}) => {
  const styles = styleSheet()
  const pressedDelete = async () => {
    await deleteAction()
  }
  return (
    <View style={styles.cardHeaderActions}>
      {deleteAction ? (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            styles.cardHeaderActionsItem,
          ]}
          onPress={() => pressedDelete()}
        >
          <Icon name="close" size={40} />
        </Pressable>
      ) : null}
      {editAction ? (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
          ]}
        >
          <Icon name="edit" size={40} />
        </Pressable>
      ) : null}
    </View>
  )
}

const Header = ({
  children,
  deleteAction,
}: {
  children: string
  deleteAction?: any
}) => {
  const styles = styleSheet()
  return (
    <View style={styles.cardHeader}>
      <Text style={styles.cardHeaderText}>
        {children.length > 30 ? `${children.substring(0, 30)}...` : children}
      </Text>
      <HeaderAction deleteAction={deleteAction} />
    </View>
  )
}

const Body = ({
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
          <View style={styles.cardBodyItem} key={key}>
            <Text style={styles.cardBodyItemText}>{key}</Text>
            <Text style={styles.cardBodyItemText}>{value}</Text>
          </View>
        )
      })}
      {action ? (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1.0,
            },
            styles.cardBodyButton,
          ]}
          onPress={action.onPress}
        >
          <Text style={styles.cardBodyButtonText}>{action.title}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

Card.Header = Header
Card.Body = Body

const styleSheet = () => {
  return StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: 5,
      margin: '5%',
      paddingBottom: '10%',
      backgroundColor: '#4cc9f0',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    cardHeader: {
      display: 'flex',
      width: '100%',
      height: '25%',
      flexDirection: 'row',
      backgroundColor: '#4895ef',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    cardHeaderActions: {
      display: 'flex',
      flexDirection: 'row',
      marginHorizontal: 5,
    },
    cardHeaderActionsItem: {
      marginHorizontal: 20,
    },
    cardHeaderText: {
      fontSize: 25,
      justifyContent: 'center',
      margin: 5,
      fontWeight: 'bold',
    },
    cardBody: {
      width: '100%',
      height: '100%',
    },
    cardBodyItem: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    cardBodyItemText: {
      margin: '1%',
    },
    cardBodyButton: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: '70%',
      height: '30%',
      marginTop: '5%',
      marginHorizontal: '15%',
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: '#480CA8',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    cardBodyButtonText: {
      fontSize: 25,
      color: 'white',
    },
  })
}
