import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';

interface CustomPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const CustomPopUp: React.FC<CustomPopUpProps> = ({ isOpen, onClose, title, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <Pressable 
          style={styles.overlay}
          onPress={onClose}
        />
        <View style={styles.modalView}>
          {/* En-tête */}
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          {/* Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          {/* Bouton */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    marginBottom: 16,
  },
  titleText: {
    fontSize: 20,
    color: '#1C0D45',
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },
  messageContainer: {
    marginBottom: 24,
  },
  messageText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Jua',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#E8A85F',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Jua',
    fontWeight: 'bold',
  },
});

export default CustomPopUp;