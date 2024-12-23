import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";


const CustomHeader = () => {
    const { isTablet } = useResponsiveLayout();

    if(isTablet) {
        return (
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity>
                    <Feather name="mic" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
                <View style={styles.appTitle}>
                        <Text style={styles.nomViolet}>Poly</Text>
                        <Text style={styles.nom}>Recipe</Text>
                    </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                    <Feather name="bell" size={24} color="#666" />
                    </TouchableOpacity>
                    <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>Novice</Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity>
                    <Feather name="mic" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
                <View style={styles.appTitle}>
                        <Text style={styles.nomViolet}>Poly</Text>
                        <Text style={styles.nom}>Recipe</Text>
                    </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                    <Feather name="bell" size={24} color="#666" />
                    </TouchableOpacity>
                    <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>Novice</Text>
                    </View>
                </View>
            </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
      },
      headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
      appTitle: {
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A3AFF',
      },
      headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
      levelBadge: {
        backgroundColor: '#E9A23B',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
      },
      levelText: {
        color: '#fff',
        fontSize: 12,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingTop: 8,
      },
      nomViolet: {
        color: '#3A1994',
      },
      nom: {
        color: '#E8A85F',
      },
})