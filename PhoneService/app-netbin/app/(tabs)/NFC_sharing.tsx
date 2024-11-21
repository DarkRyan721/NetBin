import React, { useEffect } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    SafeAreaView,
    StatusBar,
    Alert,
    Button,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

import { CardMoving } from '@/components/CardMoving';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SVG_NetBin_Logo from '@/assets/svg/Svg_Image';

export default function NFCApp() {
    const { isAuthenticated, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || !token) {
            Alert.alert(
                'Acceso Restringido',
                'Debes iniciar sesión para acceder a esta funcionalidad.',
                [
                    {
                        text: 'Ir al Login',
                        onPress: () => router.replace('./index'), // Redirigir al index
                    },
                ]
            );
        }
    }, [isAuthenticated, token]);

    if (!isAuthenticated || !token) {
        return null;
    }

    // Función para enviar un POST al servidor
    const sendDataToServer = async () => {
        try {
            const response = await fetch('http:local/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Si necesitas autenticar con un token
                },
                body: JSON.stringify({ message: 'Datos enviados desde la app.' }), // Datos enviados al servidor
            });

            if (!response.ok) {
                throw new Error('Error enviando los datos al servidor');
            }

            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            Alert.alert('Éxito', 'Datos enviados correctamente.');
        } catch (error) {
            console.error('Error enviando datos al servidor:', error);
            Alert.alert('Error', 'No se pudieron enviar los datos al servidor.');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#000000', dark: '#000000' }}
                headerImage={
                    <View style={styles.headerImageContainer}>
                        <SVG_NetBin_Logo style={styles.netbinLogo} />
                    </View>
                }>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Register Cobins</ThemedText>
                    <CardMoving />
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 1: Come to our bin</ThemedText>
                    <ThemedText>
                        Come to our <ThemedText type="defaultSemiBold">Netbins</ThemedText> and talk to them about the waste.
                        Speak loud and clearly. 😉
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 2: Try it and interact with the intelligence.</ThemedText>
                    <ThemedText>
                        Wait until Netbin classifies the waste and gives you a signal to throw it away. ⏳
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 3: Get rewarded for your contribution to the environment.</ThemedText>
                    <ThemedText>
                        When you're ready and the process is complete, feel better with a detailed rating and enjoy our benefits. 🍃
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Step 4: Send Data to Server</ThemedText>
                    <Button title="Use NFC to register CoBins" onPress={sendDataToServer} />
                </ThemedView>
            </ParallaxScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    headerImageContainer: {
        paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight || 44 : StatusBar.currentHeight || 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    netbinLogo: {
        height: 178,
        width: 290,
    },
});
