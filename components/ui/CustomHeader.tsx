import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import {MOCK_USER, User} from "@/types/user";
import {ThemedText} from "@/components/ThemedText";

type CustomHeaderProps = {
    user: User;
    title: string;
};
const CustomHeader = ({ user, title }: CustomHeaderProps) => {
    const { isTablet } = useResponsiveLayout();

    if(isTablet) {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.leftContent}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.rightContent}>
                    <TouchableOpacity>
                        <Feather
                            name={MOCK_USER.micEnabled ? 'mic' : 'mic-off'}
                            size={24}
                            color="#666"
                        />                        
                    </TouchableOpacity>
                    <View style={styles.avatarSection}>
                        <ThemedText style={styles.levelBadge}>{MOCK_USER.level}</ThemedText>
                        <View style={styles.avatarContainer}>
                            <ThemedText style={styles.avatarText}>
                                {MOCK_USER.name.charAt(0)}
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return(
        <View style={styles.headerPhone}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity>
                            <Feather
                                name={MOCK_USER.micEnabled ? 'mic' : 'mic-off'}
                                size={24}
                                color="#666"
                            />                        
                    </TouchableOpacity>
                </View>
                <View style={styles.appTitle}>
                        <Text style={styles.nomViolet}>Poly</Text>
                        <Text style={styles.nom}>Recipe</Text>
                    </View>
                <View style={styles.headerRight}>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>Novice</Text>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
      },
      headerPhone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginTop: 50,
      },
      headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      },
      appTitle: {
        flexDirection: 'row',
        textAlign: 'center',
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
        fontFamily: 'Jua',
        fontSize: 16,
      },
      nom: {
        color: '#E8A85F',
        fontFamily: 'Jua',
        fontSize: 16,
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
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: '#F9F7FA',
        marginBottom: 16,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    avatarSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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
