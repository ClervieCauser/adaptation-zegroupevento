import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import {MOCK_USER, User} from "@/types/user";
import {ThemedText} from "@/components/ThemedText";

type CustomHeaderProps = {
    user: User;
};
const CustomHeader = ({ user }: CustomHeaderProps) => {
    const { isTablet } = useResponsiveLayout();

    if(isTablet) {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.rightContent}>
                    <View style={styles.micContainer}>
                        <ThemedText style={styles.micStatus}>
                            {MOCK_USER.micEnabled ? 'MIC ON' : 'MIC OFF'}
                        </ThemedText>
                    </View>
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <ThemedText style={styles.avatarText}>
                                {MOCK_USER.name.charAt(0)}
                            </ThemedText>
                        </View>
                        <ThemedText style={styles.levelBadge}>{MOCK_USER.level}</ThemedText>
                    </View>
                </View>
            </View>
        );
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
    levelText: {
        color: '#E8A85F',
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
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C0D45',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    leftContent: {
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'Jua',
        color: '#1C0D45',
    },

    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    micContainer: {
        marginRight: 16,
    },
    avatarSection: {
        alignItems: 'center',
        gap: 4,
    },
    avatarContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#E8A85F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Jua',
    },
    levelBadge: {
        fontSize: 12,
        color: '#E8A85F',
        backgroundColor: '#FDF4E7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    micStatus: {
        color: '#1C0D45',
        fontSize: 14,
        opacity: 0.6,
    },
})
    export default CustomHeader;
